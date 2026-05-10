<?php
declare(strict_types=1);

/**
 * Minimal contact-form handler for MetalSingapore.sg.
 *
 * Place this file at the document root next to index.html so the form action
 * `/contact-submit.php` resolves on cPanel. Edit the `$to` address and
 * `$from` headers for the production mail account before go-live.
 *
 * Validates basic fields, applies a tiny honeypot spam check, then calls
 * `mail()` for delivery. Returns plain text so the SPA fetch handler can
 * detect 200 OK and show the success state.
 *
 * Operating entity: Ezzogenics Pte Ltd. Operating as MetalSingapore.sg. Singapore.
 */

header('Content-Type: text/plain; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: strict-origin-when-cross-origin');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo 'Method not allowed';
    exit;
}

// Honeypot — bots fill every field, including hidden ones.
// Field name `website` matches the hidden input rendered by Contact.tsx.
if (!empty($_POST['website'] ?? '')) {
    http_response_code(204);
    exit;
}

$name = trim((string) ($_POST['name'] ?? ''));
$email = trim((string) ($_POST['email'] ?? ''));
$phone = trim((string) ($_POST['phone'] ?? ''));
$category = trim((string) ($_POST['category'] ?? ''));
$message = trim((string) ($_POST['message'] ?? ''));

if ($name === '' || strlen($name) > 200) { http_response_code(422); echo 'Invalid name'; exit; }
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) { http_response_code(422); echo 'Invalid email'; exit; }
if ($phone !== '' && strlen($phone) > 64) { http_response_code(422); echo 'Invalid phone'; exit; }
if ($category !== '' && strlen($category) > 80) { http_response_code(422); echo 'Invalid category'; exit; }
if ($message === '' || strlen($message) > 6000) { http_response_code(422); echo 'Invalid message'; exit; }

$to = 'david@ezzogenics.com';
$subject = 'MetalSingapore.sg enquiry — ' . substr($category ?: 'general', 0, 50);
$body = "New enquiry via metalsingapore.sg\n\n"
    . "Name: $name\n"
    . "Email: $email\n"
    . "Phone: $phone\n"
    . "Service stream: $category\n"
    . "------------------------\n"
    . $message
    . "\n\n--\n"
    . "Submitted: " . date('c') . "\n"
    . "Source IP: " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . "\n";

$headers = [
    'From' => 'no-reply@metalsingapore.sg',
    'Reply-To' => $email,
    'X-Mailer' => 'MetalSingapore-Site/1.0',
    'Content-Type' => 'text/plain; charset=UTF-8',
];

$ok = @mail($to, $subject, $body, $headers);
if (!$ok) {
    // Fallback: append to a local log so messages aren't lost if mail fails.
    // Note: ensure this directory is writable but NOT web-accessible in production
    // (move log directory above doc root or block via .htaccess).
    $log = __DIR__ . '/contact-log.txt';
    @file_put_contents($log, date('c') . " | $email | $name\n$body\n\n", FILE_APPEND | LOCK_EX);
}
http_response_code(200);
echo 'OK';
