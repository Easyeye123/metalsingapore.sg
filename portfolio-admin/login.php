<?php
declare(strict_types=1);

require_once __DIR__ . '/lib/auth.php';
require_once __DIR__ . '/lib/security_headers.php';
require_once __DIR__ . '/lib/view.php';

SecurityHeaders::send();

$auth = new AdminAuth();
$auth->startSession();

if (!$auth->isConfigured()) {
    header('Location: setup.php');
    exit;
}
if ($auth->isLoggedIn()) {
    header('Location: dashboard.php');
    exit;
}

$errors = [];
$flash = View::flashFromQuery('msg');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!$auth->checkCsrf($_POST['csrf'] ?? null)) {
        $errors[] = 'Session expired. Reload and try again.';
    }
    if ($auth->isLockedOut()) {
        $errors[] = 'Too many failed attempts. Try again in '
            . ceil($auth->lockoutSecondsRemaining() / 60) . ' minutes.';
    }
    if (!$errors) {
        $password = (string) ($_POST['password'] ?? '');
        $code = (string) ($_POST['code'] ?? '');
        if ($auth->login($password, $code)) {
            header('Location: dashboard.php');
            exit;
        }
        $errors[] = 'Sign-in failed. Check the passcode and Authenticator code.';
        if ($auth->isLockedOut()) {
            $errors[] = 'Account locked for '
                . ceil($auth->lockoutSecondsRemaining() / 60) . ' minutes.';
        }
    }
}

$csrf = View::escape($auth->csrfToken());

View::header('Portfolio sign in');
echo '<p class="lead">Casual-access gate. Enter the passcode and a 6-digit code from Google Authenticator (or any TOTP app).</p>';
View::heroClose();
?>
<section class="section">
  <div class="container">
    <div class="form-card admin-login">
      <?php if ($flash): ?>
        <div class="callout callout--info"><?= View::escape($flash) ?></div>
      <?php endif; ?>
      <?php if ($errors): ?>
        <div class="callout" style="border-color:#a12c2c;color:#a12c2c">
          <?php foreach ($errors as $err): ?>
            <p><?= View::escape($err) ?></p>
          <?php endforeach; ?>
        </div>
      <?php endif; ?>
      <form method="post">
        <input type="hidden" name="csrf" value="<?= $csrf ?>">
        <div class="form-row">
          <label for="password">Passcode</label>
          <input id="password" name="password" type="password" autocomplete="current-password" required>
        </div>
        <div class="form-row">
          <label for="code">6-digit Authenticator code</label>
          <input id="code" name="code" type="text" inputmode="numeric" pattern="[0-9]{6}" maxlength="6" autocomplete="one-time-code" required>
        </div>
        <div class="form-actions">
          <button class="btn btn--primary" type="submit">Sign in</button>
        </div>
        <p class="form-help">Five failed attempts lock this browser session for 15 minutes. To reset credentials entirely, delete <code>portfolio-admin/config/credentials.json</code> on the server.</p>
      </form>
    </div>
  </div>
</section>
<?php View::footer(); ?>
