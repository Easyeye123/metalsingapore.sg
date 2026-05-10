<?php
declare(strict_types=1);

/**
 * Reads/writes the admin credentials file.
 *
 * The file lives at config/credentials.json relative to the admin directory.
 * It is created with mode 0600 so cPanel/Apache will not serve it directly,
 * and the config/.htaccess additionally denies HTTP access.
 */
final class AdminConfig
{
    private string $path;
    private ?array $cache = null;

    public function __construct(string $path)
    {
        $this->path = $path;
    }

    public static function default(): self
    {
        return new self(dirname(__DIR__) . '/config/credentials.json');
    }

    public function path(): string
    {
        return $this->path;
    }

    public function exists(): bool
    {
        return is_file($this->path);
    }

    public function load(): array
    {
        if ($this->cache !== null) {
            return $this->cache;
        }
        if (!$this->exists()) {
            return $this->cache = [];
        }
        $raw = file_get_contents($this->path);
        if ($raw === false || $raw === '') {
            return $this->cache = [];
        }
        $decoded = json_decode($raw, true);
        if (!is_array($decoded)) {
            throw new RuntimeException('credentials.json is corrupt.');
        }
        return $this->cache = $decoded;
    }

    public function save(array $data): void
    {
        $dir = dirname($this->path);
        if (!is_dir($dir) && !mkdir($dir, 0700, true) && !is_dir($dir)) {
            throw new RuntimeException('Cannot create config directory.');
        }
        $tmp = $this->path . '.tmp.' . bin2hex(random_bytes(4));
        $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        if ($json === false) {
            throw new RuntimeException('Cannot encode credentials.');
        }
        if (file_put_contents($tmp, $json, LOCK_EX) === false) {
            throw new RuntimeException('Cannot write credentials.');
        }
        @chmod($tmp, 0600);
        if (!rename($tmp, $this->path)) {
            @unlink($tmp);
            throw new RuntimeException('Cannot finalise credentials write.');
        }
        $this->cache = $data;
    }

    public function get(string $key, $default = null)
    {
        $data = $this->load();
        return array_key_exists($key, $data) ? $data[$key] : $default;
    }

    public function set(string $key, $value): void
    {
        $data = $this->load();
        $data[$key] = $value;
        $this->save($data);
    }
}
