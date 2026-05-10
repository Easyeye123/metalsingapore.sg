<?php
declare(strict_types=1);

/**
 * Read/write the public projects.json + image uploads.
 *
 * Both targets sit in the public site root, two levels above this admin dir
 * by default (cPanel layout: public_html/portfolio-admin/lib/ → public_html/).
 */
final class ProjectsStore
{
    private const ALLOWED_MIME = [
        'image/jpeg' => 'jpg',
        'image/png'  => 'png',
        'image/webp' => 'webp',
        'image/gif'  => 'gif',
    ];

    private const MAX_BYTES = 6 * 1024 * 1024; // 6 MB per file

    private string $jsonPath;
    private string $imageDir;
    private string $imagePublicPrefix;

    public function __construct(?string $publicRoot = null)
    {
        $publicRoot = $publicRoot ?? dirname(__DIR__, 2);
        $this->jsonPath = $publicRoot . '/assets/data/projects.json';
        // Public site uses /assets/images/projects/ for both seed and
        // admin-uploaded photos so React's image src paths resolve uniformly.
        $this->imageDir = $publicRoot . '/assets/images/projects';
        $this->imagePublicPrefix = '/assets/images/projects/';
    }

    public function load(): array
    {
        if (!is_file($this->jsonPath)) {
            return ['projects' => [], 'updated' => date('Y-m-d')];
        }
        $raw = file_get_contents($this->jsonPath);
        if ($raw === false || $raw === '') {
            return ['projects' => [], 'updated' => date('Y-m-d')];
        }
        $decoded = json_decode($raw, true);
        if (!is_array($decoded) || !isset($decoded['projects']) || !is_array($decoded['projects'])) {
            return ['projects' => [], 'updated' => date('Y-m-d')];
        }
        return $decoded;
    }

    public function save(array $projects, string $instructions = ''): void
    {
        $payload = [
            'updated'      => date('Y-m-d'),
            'instructions' => $instructions !== ''
                ? $instructions
                : 'Managed through /portfolio-admin/. Each description should stay at or below 50 words.',
            'projects'     => array_values($projects),
        ];
        $json = json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        if ($json === false) {
            throw new RuntimeException('Cannot encode projects.json');
        }
        $dir = dirname($this->jsonPath);
        if (!is_dir($dir) && !mkdir($dir, 0755, true) && !is_dir($dir)) {
            throw new RuntimeException('Cannot create data directory.');
        }
        $tmp = $this->jsonPath . '.tmp.' . bin2hex(random_bytes(4));
        if (file_put_contents($tmp, $json, LOCK_EX) === false) {
            throw new RuntimeException('Cannot write projects.json');
        }
        @chmod($tmp, 0644);
        if (!rename($tmp, $this->jsonPath)) {
            @unlink($tmp);
            throw new RuntimeException('Cannot finalise projects.json write.');
        }
    }

    public function find(string $id): ?array
    {
        foreach ($this->load()['projects'] as $project) {
            if (($project['id'] ?? '') === $id) {
                return $project;
            }
        }
        return null;
    }

    public function upsert(array $project): void
    {
        $data = $this->load();
        $found = false;
        foreach ($data['projects'] as $i => $existing) {
            if (($existing['id'] ?? '') === ($project['id'] ?? '')) {
                $data['projects'][$i] = $project;
                $found = true;
                break;
            }
        }
        if (!$found) {
            array_unshift($data['projects'], $project);
        }
        $this->save($data['projects'], $data['instructions'] ?? '');
    }

    public function delete(string $id): void
    {
        $data = $this->load();
        $remaining = [];
        $removed = null;
        foreach ($data['projects'] as $project) {
            if (($project['id'] ?? '') === $id) {
                $removed = $project;
                continue;
            }
            $remaining[] = $project;
        }
        if ($removed === null) {
            return;
        }
        // Best-effort removal of image files we own. We only touch files
        // that live under our public image prefix, and we re-resolve via
        // realpath() so symlinks or odd basenames cannot escape the dir.
        $realImageDir = realpath($this->imageDir);
        if ($realImageDir !== false) {
            foreach (($removed['images'] ?? []) as $img) {
                $src = is_array($img) ? ($img['src'] ?? '') : '';
                if (!is_string($src) || $src === '') {
                    continue;
                }
                if (strpos($src, $this->imagePublicPrefix) !== 0) {
                    continue;
                }
                $candidate = $this->imageDir . '/' . basename($src);
                $realCandidate = realpath($candidate);
                if ($realCandidate === false) {
                    continue;
                }
                if (strpos($realCandidate, $realImageDir . DIRECTORY_SEPARATOR) !== 0) {
                    continue;
                }
                if (is_file($realCandidate)) {
                    @unlink($realCandidate);
                }
            }
        }
        $this->save($remaining, $data['instructions'] ?? '');
    }

    /**
     * Validate + persist uploaded files. Returns image records {src, alt}.
     *
     * @param array $fileSpec the entry from $_FILES
     * @param string $idSlug  cleaned project id (used as filename prefix)
     * @param string $alt     alt text shared across uploaded images
     */
    public function storeUploadedImages(array $fileSpec, string $idSlug, string $alt): array
    {
        if (empty($fileSpec) || empty($fileSpec['name'])) {
            return [];
        }
        if (!is_dir($this->imageDir) && !mkdir($this->imageDir, 0755, true) && !is_dir($this->imageDir)) {
            throw new RuntimeException('Cannot create image directory.');
        }
        $names = (array) $fileSpec['name'];
        $tmpNames = (array) $fileSpec['tmp_name'];
        $errors = (array) $fileSpec['error'];
        $sizes = (array) $fileSpec['size'];
        $records = [];
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        $count = count($names);
        for ($i = 0; $i < $count; $i++) {
            if (($errors[$i] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) {
                continue;
            }
            if (($errors[$i] ?? UPLOAD_ERR_OK) !== UPLOAD_ERR_OK) {
                throw new RuntimeException('Upload failed for ' . $names[$i]);
            }
            if (($sizes[$i] ?? 0) > self::MAX_BYTES) {
                throw new RuntimeException('Image exceeds 6 MB: ' . $names[$i]);
            }
            $tmp = $tmpNames[$i] ?? '';
            if ($tmp === '' || !is_uploaded_file($tmp)) {
                throw new RuntimeException('Suspicious upload rejected.');
            }
            $mime = $finfo->file($tmp) ?: '';
            if (!isset(self::ALLOWED_MIME[$mime])) {
                throw new RuntimeException('Unsupported image type: ' . $mime);
            }
            $ext = self::ALLOWED_MIME[$mime];
            $safeBase = self::slug(pathinfo($names[$i], PATHINFO_FILENAME)) ?: ('image-' . ($i + 1));
            $filename = $idSlug . '-' . $safeBase . '-' . bin2hex(random_bytes(3)) . '.' . $ext;
            $dest = $this->imageDir . '/' . $filename;
            if (!move_uploaded_file($tmp, $dest)) {
                throw new RuntimeException('Failed to move uploaded image.');
            }
            @chmod($dest, 0644);
            $records[] = [
                'src' => $this->imagePublicPrefix . $filename,
                'alt' => $alt !== '' ? $alt : ('Project image ' . ($i + 1)),
            ];
        }
        return $records;
    }

    public static function slug(string $text): string
    {
        $text = strtolower(trim($text));
        $text = preg_replace('/[^a-z0-9]+/', '-', $text) ?? '';
        $text = trim($text, '-');
        return substr($text, 0, 70);
    }

    public static function wordCount(string $text): int
    {
        $clean = trim($text);
        if ($clean === '') {
            return 0;
        }
        $parts = preg_split('/\s+/', $clean) ?: [];
        return count(array_filter($parts, static fn($w) => $w !== ''));
    }
}
