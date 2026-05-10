<?php
declare(strict_types=1);

require_once __DIR__ . '/lib/auth.php';
require_once __DIR__ . '/lib/security_headers.php';

SecurityHeaders::send();

$auth = new AdminAuth();
$auth->logout();
header('Location: login.php?msg=' . rawurlencode('You have been signed out.'));
exit;
