<?php
declare(strict_types=1);

/**
 * Minimum security headers + noindex robots header for /portfolio-admin/.
 *
 * Loaded from index.php / login.php / dashboard.php / setup.php / logout.php
 * before any output. Headers also act as a defence-in-depth alongside the
 * .htaccess rules in the admin directory.
 */
final class SecurityHeaders
{
    public static function send(): void
    {
        if (headers_sent()) {
            return;
        }
        // Block search-engine indexing of the admin area at the HTTP layer.
        header('X-Robots-Tag: noindex, nofollow, noarchive, nosnippet');
        // Anti-clickjacking + MIME sniffing.
        header('X-Frame-Options: DENY');
        header('X-Content-Type-Options: nosniff');
        header('Referrer-Policy: strict-origin-when-cross-origin');
        // Disable a generous default of the Permissions-Policy.
        header(
            'Permissions-Policy: '
                . 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), '
                . 'magnetometer=(), microphone=(), payment=(), usb=()'
        );
        // CSP: admin pages render server-side HTML only (no third-party JS, no
        // inline event handlers). Allow inline <style> for the small scoped
        // styles used in admin templates.
        header(
            "Content-Security-Policy: "
                . "default-src 'self'; "
                . "img-src 'self' data:; "
                . "style-src 'self' 'unsafe-inline'; "
                . "script-src 'self'; "
                . "form-action 'self'; "
                . "frame-ancestors 'none'; "
                . "base-uri 'self'; "
                . "object-src 'none'"
        );
        // HSTS — 6 months. Apache forwards HTTPS via Cloudflare/cPanel; only
        // emit when we know we're on HTTPS.
        if (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') {
            header('Strict-Transport-Security: max-age=15552000; includeSubDomains');
        }
    }
}
