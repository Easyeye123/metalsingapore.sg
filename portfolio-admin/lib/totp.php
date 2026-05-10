<?php
declare(strict_types=1);

/**
 * RFC 6238 TOTP + RFC 4648 Base32 helpers.
 *
 * No external dependencies. PHP 7.4+.
 */

final class Totp
{
    private const BASE32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

    public static function generateSecret(int $bytes = 20): string
    {
        if ($bytes < 16) {
            throw new InvalidArgumentException('Secret must be at least 16 bytes.');
        }
        return self::base32Encode(random_bytes($bytes));
    }

    public static function base32Encode(string $bytes): string
    {
        $bits = 0;
        $value = 0;
        $output = '';
        $len = strlen($bytes);
        for ($i = 0; $i < $len; $i++) {
            $value = ($value << 8) | ord($bytes[$i]);
            $bits += 8;
            while ($bits >= 5) {
                $output .= self::BASE32[($value >> ($bits - 5)) & 31];
                $bits -= 5;
            }
        }
        if ($bits > 0) {
            $output .= self::BASE32[($value << (5 - $bits)) & 31];
        }
        return $output;
    }

    public static function base32Decode(string $input): string
    {
        $cleaned = strtoupper(preg_replace('/[\s=]+/', '', $input) ?? '');
        if ($cleaned === '') {
            return '';
        }
        if (strspn($cleaned, self::BASE32) !== strlen($cleaned)) {
            throw new InvalidArgumentException('Invalid Base32 input.');
        }
        $bits = 0;
        $value = 0;
        $output = '';
        $len = strlen($cleaned);
        for ($i = 0; $i < $len; $i++) {
            $idx = strpos(self::BASE32, $cleaned[$i]);
            $value = ($value << 5) | $idx;
            $bits += 5;
            if ($bits >= 8) {
                $output .= chr(($value >> ($bits - 8)) & 0xFF);
                $bits -= 8;
            }
        }
        return $output;
    }

    public static function code(string $secretBase32, ?int $step = null): string
    {
        if ($step === null) {
            $step = (int) floor(time() / 30);
        }
        $key = self::base32Decode($secretBase32);
        // 64-bit big-endian counter.
        $hi = ($step >> 32) & 0xFFFFFFFF;
        $lo = $step & 0xFFFFFFFF;
        $msg = pack('NN', $hi, $lo);
        $hash = hash_hmac('sha1', $msg, $key, true);
        $offset = ord($hash[strlen($hash) - 1]) & 0x0F;
        $bin = ((ord($hash[$offset]) & 0x7F) << 24)
             | ((ord($hash[$offset + 1]) & 0xFF) << 16)
             | ((ord($hash[$offset + 2]) & 0xFF) << 8)
             | (ord($hash[$offset + 3]) & 0xFF);
        return str_pad((string) ($bin % 1000000), 6, '0', STR_PAD_LEFT);
    }

    public static function verify(string $secretBase32, string $candidate, int $window = 1): bool
    {
        $clean = preg_replace('/\s+/', '', $candidate) ?? '';
        if (!preg_match('/^\d{6}$/', $clean)) {
            return false;
        }
        $step = (int) floor(time() / 30);
        for ($offset = -$window; $offset <= $window; $offset++) {
            try {
                $expected = self::code($secretBase32, $step + $offset);
            } catch (Throwable $e) {
                return false;
            }
            if (hash_equals($expected, $clean)) {
                return true;
            }
        }
        return false;
    }

    public static function provisioningUri(string $secretBase32, string $accountName, string $issuer): string
    {
        $label = rawurlencode($issuer . ':' . $accountName);
        $params = http_build_query([
            'secret'    => $secretBase32,
            'issuer'    => $issuer,
            'algorithm' => 'SHA1',
            'digits'    => 6,
            'period'    => 30,
        ], '', '&', PHP_QUERY_RFC3986);
        return 'otpauth://totp/' . $label . '?' . $params;
    }
}
