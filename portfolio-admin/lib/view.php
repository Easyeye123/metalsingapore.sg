<?php
declare(strict_types=1);

/**
 * Tiny shared view helpers for the admin pages.
 */
final class View
{
    public static function escape(?string $text): string
    {
        return htmlspecialchars((string) $text, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    }

    public static function header(string $title, string $eyebrow = 'Portfolio admin'): void
    {
        $titleEsc = self::escape($title);
        $eyebrowEsc = self::escape($eyebrow);
        echo <<<HTML
<!doctype html>
<html lang="en-SG">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<meta name="theme-color" content="#102A43">
<title>{$titleEsc} — Ezzogenics admin</title>
<meta name="robots" content="noindex, nofollow" />
<link rel="icon" type="image/jpeg" href="../assets/images/ezz-icon.jpg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/css/site.css">
</head>
<body class="admin-page">
<main id="main">
<section class="page-hero">
  <div class="container">
    <p class="eyebrow">{$eyebrowEsc}</p>
    <h1>{$titleEsc}</h1>
HTML;
    }

    public static function heroClose(): void
    {
        echo "  </div>\n</section>\n";
    }

    public static function footer(): void
    {
        echo <<<HTML
</main>
</body>
</html>
HTML;
    }

    public static function flashFromQuery(string $key = 'msg'): ?string
    {
        $val = $_GET[$key] ?? null;
        return is_string($val) ? $val : null;
    }
}
