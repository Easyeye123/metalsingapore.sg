<?php
declare(strict_types=1);

require_once __DIR__ . '/lib/auth.php';
require_once __DIR__ . '/lib/security_headers.php';
require_once __DIR__ . '/lib/totp.php';
require_once __DIR__ . '/lib/view.php';

SecurityHeaders::send();

$auth = new AdminAuth();
$auth->startSession();

if ($auth->isConfigured()) {
    header('Location: login.php');
    exit;
}

if (empty($_SESSION['setup_secret'])) {
    $_SESSION['setup_secret'] = Totp::generateSecret();
}
$totpSecret = $_SESSION['setup_secret'];

$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!$auth->checkCsrf($_POST['csrf'] ?? null)) {
        $errors[] = 'Session expired. Reload and try again.';
    }
    $action = $_POST['action'] ?? '';

    if (!$errors && $action === 'regenerate') {
        $_SESSION['setup_secret'] = Totp::generateSecret();
        header('Location: setup.php');
        exit;
    }

    if (!$errors && $action === 'confirm') {
        $password = (string) ($_POST['password'] ?? '');
        $passwordConfirm = (string) ($_POST['password_confirm'] ?? '');
        $verifyCode = (string) ($_POST['verify_code'] ?? '');

        if (strlen($password) < 12) {
            $errors[] = 'Password must be at least 12 characters.';
        }
        if ($password !== $passwordConfirm) {
            $errors[] = 'Passwords do not match.';
        }
        if (!preg_match('/^\d{6}$/', preg_replace('/\s+/', '', $verifyCode) ?? '')) {
            $errors[] = 'Authenticator code must be exactly 6 digits.';
        }
        if (!$errors) {
            if ($auth->setupCredentials($password, $totpSecret, $verifyCode)) {
                unset($_SESSION['setup_secret']);
                header('Location: login.php?msg=' . rawurlencode('Setup complete. Sign in with your new credentials.'));
                exit;
            }
            $errors[] = 'Authenticator code did not match. Wait for the next 30-second cycle and retry.';
        }
    }
}

$otpUri = Totp::provisioningUri($totpSecret, 'Portfolio Admin', 'Ezzogenics');
$secretFormatted = trim((string) preg_replace('/(.{4})/', '$1 ', $totpSecret));
$csrf = View::escape($auth->csrfToken());
$otpUriEsc = View::escape($otpUri);
$secretEsc = View::escape($secretFormatted);

View::header('First-time admin setup');
echo '<p class="lead">Create the portfolio passcode and add the site to Google Authenticator (or any TOTP app).</p>';
View::heroClose();
?>
<section class="section">
  <div class="container">
    <div class="callout callout--info">
      <strong>One-time setup.</strong> The credentials are saved server-side under <code>portfolio-admin/config/credentials.json</code> with restrictive permissions and a deny-all <code>.htaccess</code>. Once configured, this page redirects to the login.
    </div>

    <?php if ($errors): ?>
      <div class="callout" style="border-color:#a12c2c;color:#a12c2c">
        <strong>Setup error:</strong>
        <ul>
          <?php foreach ($errors as $err): ?>
            <li><?= View::escape($err) ?></li>
          <?php endforeach; ?>
        </ul>
      </div>
    <?php endif; ?>

    <div class="grid grid--2" style="margin-top:1.4rem">
      <div class="form-card">
        <h2>1. Add Authenticator</h2>
        <ol class="admin-steps">
          <li>Open Google Authenticator and choose <strong>Add a code &rarr; Enter a setup key</strong>.</li>
          <li>Tap the otpauth link below on the same phone, or paste the Base32 secret manually.</li>
          <li>No QR code is shown — generating one through a public service would leak the secret. Use an offline QR generator if you need a QR.</li>
        </ol>
        <form method="post" style="margin-top:1rem">
          <input type="hidden" name="csrf" value="<?= $csrf ?>">
          <input type="hidden" name="action" value="regenerate">
          <button class="btn btn--ghost btn--sm" type="submit">Generate a new secret</button>
        </form>
        <div class="form-row" style="margin-top:1.2rem">
          <label>Provisioning link (otpauth://)</label>
          <textarea readonly rows="3" style="font-family:var(--font-mono,monospace);font-size:.85rem"><?= $otpUriEsc ?></textarea>
          <p class="form-help"><a href="<?= $otpUriEsc ?>" rel="noopener">Open in authenticator app</a> (tap on your phone where Authenticator is installed).</p>
        </div>
        <div class="form-row">
          <label>Secret (Base32, manual entry)</label>
          <input type="text" readonly value="<?= $secretEsc ?>" style="font-family:var(--font-mono,monospace);letter-spacing:.04em">
          <p class="form-help">Issuer: <code>Ezzogenics</code> · Account: <code>Portfolio Admin</code> · Algorithm: SHA1 · Digits: 6 · Period: 30s</p>
        </div>
      </div>

      <div class="form-card">
        <h2>2. Set the passcode &amp; confirm</h2>
        <form method="post">
          <input type="hidden" name="csrf" value="<?= $csrf ?>">
          <input type="hidden" name="action" value="confirm">
          <div class="form-row">
            <label for="password">New passcode (min 12 characters)</label>
            <input id="password" name="password" type="password" required minlength="12" autocomplete="new-password">
          </div>
          <div class="form-row">
            <label for="password_confirm">Confirm passcode</label>
            <input id="password_confirm" name="password_confirm" type="password" required minlength="12" autocomplete="new-password">
          </div>
          <div class="form-row">
            <label for="verify_code">Current 6-digit Authenticator code</label>
            <input id="verify_code" name="verify_code" type="text" inputmode="numeric" pattern="[0-9]{6}" maxlength="6" autocomplete="one-time-code" required>
          </div>
          <div class="form-actions">
            <button class="btn btn--primary" type="submit">Save credentials</button>
          </div>
          <p class="form-help">Once saved, this setup page is disabled. To rotate credentials, delete <code>config/credentials.json</code> on the server.</p>
        </form>
      </div>
    </div>
  </div>
</section>
<?php View::footer(); ?>
