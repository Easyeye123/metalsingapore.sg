<?php
declare(strict_types=1);

require_once __DIR__ . '/lib/auth.php';
require_once __DIR__ . '/lib/security_headers.php';

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
header('Location: login.php');
exit;
