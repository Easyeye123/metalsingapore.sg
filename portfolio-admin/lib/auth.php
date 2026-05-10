<?php
declare(strict_types=1);

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/totp.php';

/**
 * Session, password, CSRF and rate-limit helpers.
 */
final class AdminAuth
{
    public const SESSION_NAME = 'metalsg_admin_sid';
    private const MAX_FAILED_LOGINS = 5;
    private const LOCKOUT_SECONDS = 900; // 15 minutes

    private AdminConfig $config;

    public function __construct(?AdminConfig $config = null)
    {
        $this->config = $config ?? AdminConfig::default();
    }

    public function startSession(): void
    {
        if (session_status() === PHP_SESSION_ACTIVE) {
            return;
        }
        session_name(self::SESSION_NAME);
        $secure = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';
        session_set_cookie_params([
            'lifetime' => 0,
            'path'     => '/',
            'secure'   => $secure,
            'httponly' => true,
            'samesite' => 'Strict',
        ]);
        session_start();
        if (empty($_SESSION['csrf_token'])) {
            $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        }
    }

    public function isConfigured(): bool
    {
        $data = $this->config->load();
        return !empty($data['password_hash']) && !empty($data['totp_secret']);
    }

    public function isLoggedIn(): bool
    {
        return $this->startedSession() && !empty($_SESSION['admin_authenticated']);
    }

    public function requireLogin(): void
    {
        $this->startSession();
        if (!$this->isLoggedIn()) {
            header('Location: login.php');
            exit;
        }
    }

    public function login(string $password, string $totpCode): bool
    {
        $this->startSession();
        if ($this->isLockedOut()) {
            return false;
        }
        $data = $this->config->load();
        $hash = $data['password_hash'] ?? '';
        $secret = $data['totp_secret'] ?? '';
        if ($hash === '' || $secret === '') {
            return false;
        }
        $passwordOk = password_verify($password, $hash);
        $totpOk = $passwordOk ? Totp::verify($secret, $totpCode, 1) : false;
        if (!$passwordOk || !$totpOk) {
            $this->recordFailedLogin();
            return false;
        }
        $this->resetLockout();
        session_regenerate_id(true);
        $_SESSION['admin_authenticated'] = true;
        $_SESSION['admin_login_time'] = time();
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        return true;
    }

    public function logout(): void
    {
        $this->startSession();
        $_SESSION = [];
        if (ini_get('session.use_cookies')) {
            $params = session_get_cookie_params();
            setcookie(
                session_name(),
                '',
                time() - 42000,
                $params['path'],
                $params['domain'],
                $params['secure'],
                $params['httponly']
            );
        }
        session_destroy();
    }

    public function csrfToken(): string
    {
        $this->startSession();
        return $_SESSION['csrf_token'] ?? '';
    }

    public function checkCsrf(?string $token): bool
    {
        $expected = $this->csrfToken();
        return is_string($token) && $expected !== '' && hash_equals($expected, $token);
    }

    public function isLockedOut(): bool
    {
        $this->startSession();
        $fails = (int) ($_SESSION['admin_login_fails'] ?? 0);
        $lockedUntil = (int) ($_SESSION['admin_locked_until'] ?? 0);
        if ($lockedUntil > time()) {
            return true;
        }
        if ($lockedUntil !== 0 && $lockedUntil <= time()) {
            $_SESSION['admin_login_fails'] = 0;
            $_SESSION['admin_locked_until'] = 0;
        }
        return $fails >= self::MAX_FAILED_LOGINS;
    }

    public function lockoutSecondsRemaining(): int
    {
        $this->startSession();
        $lockedUntil = (int) ($_SESSION['admin_locked_until'] ?? 0);
        return max(0, $lockedUntil - time());
    }

    private function recordFailedLogin(): void
    {
        $_SESSION['admin_login_fails'] = (int) ($_SESSION['admin_login_fails'] ?? 0) + 1;
        if ($_SESSION['admin_login_fails'] >= self::MAX_FAILED_LOGINS) {
            $_SESSION['admin_locked_until'] = time() + self::LOCKOUT_SECONDS;
        }
    }

    private function resetLockout(): void
    {
        $_SESSION['admin_login_fails'] = 0;
        $_SESSION['admin_locked_until'] = 0;
    }

    public function setupCredentials(string $password, string $totpSecret, string $totpVerification): bool
    {
        if (!Totp::verify($totpSecret, $totpVerification, 1)) {
            return false;
        }
        $hash = password_hash($password, PASSWORD_DEFAULT);
        if ($hash === false) {
            return false;
        }
        $this->config->save([
            'password_hash' => $hash,
            'totp_secret'   => $totpSecret,
            'created_at'    => date('c'),
        ]);
        return true;
    }

    public function changePassword(string $currentPassword, string $currentTotp, string $newPassword): bool
    {
        $data = $this->config->load();
        if (empty($data['password_hash']) || empty($data['totp_secret'])) {
            return false;
        }
        if (!password_verify($currentPassword, $data['password_hash'])) {
            return false;
        }
        if (!Totp::verify($data['totp_secret'], $currentTotp, 1)) {
            return false;
        }
        $data['password_hash'] = password_hash($newPassword, PASSWORD_DEFAULT);
        $data['updated_at'] = date('c');
        $this->config->save($data);
        return true;
    }

    private function startedSession(): bool
    {
        if (session_status() === PHP_SESSION_ACTIVE) {
            return true;
        }
        $this->startSession();
        return session_status() === PHP_SESSION_ACTIVE;
    }
}
