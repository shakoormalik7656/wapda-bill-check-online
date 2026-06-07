<?php
/**
 * PITC Bill Proxy — PHP version
 * Deploy on any Pakistani cPanel hosting.
 * The server's local ISP IP is not blocked by PITC's firewall.
 *
 * Usage: https://yourdomain.com/bill.php?disco=iesco&refno=05142520973100
 */

$DISCO_URLS = [
    'iesco'  => 'https://bill.pitc.com.pk/iescobill',
    'lesco'  => 'https://bill.pitc.com.pk/lescobill',
    'mepco'  => 'https://bill.pitc.com.pk/mepcobill',
    'fesco'  => 'https://bill.pitc.com.pk/fescobill',
    'gepco'  => 'https://bill.pitc.com.pk/gepcobill',
    'pesco'  => 'https://bill.pitc.com.pk/pescobill',
    'hazeco' => 'https://bill.pitc.com.pk/hazecobill',
    'hesco'  => 'https://bill.pitc.com.pk/hescobill',
    'sepco'  => 'https://bill.pitc.com.pk/sepcobill',
    'qesco'  => 'https://bill.pitc.com.pk/qescobill',
    'tesco'  => 'https://bill.pitc.com.pk/tescobill',
];

$UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

$disco = strtolower(trim($_GET['disco'] ?? ''));
$refno = preg_replace('/\D/', '', $_GET['refno'] ?? '');

if (!isset($DISCO_URLS[$disco]) || strlen($refno) < 10 || strlen($refno) > 14) {
    http_response_code(400);
    exit('Bad Request');
}

$baseUrl  = $DISCO_URLS[$disco];
$fallback = $baseUrl . '/general?refno=' . $refno;

function pitc_fetch($url, $method = 'GET', $postData = null, $cookieHeader = '') {
    global $UA;
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HEADER         => true,
        CURLOPT_USERAGENT      => $UA,
        CURLOPT_FOLLOWLOCATION => false,
        CURLOPT_TIMEOUT        => 30,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_HTTPHEADER     => [
            'Accept: text/html,application/xhtml+xml,*/*',
            'Accept-Language: en-US,en;q=0.9',
        ],
    ]);

    if ($cookieHeader) {
        curl_setopt($ch, CURLOPT_COOKIE, $cookieHeader);
    }

    if ($method === 'POST' && $postData) {
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Accept: text/html,application/xhtml+xml,*/*',
            'Content-Type: application/x-www-form-urlencoded',
            'Referer: ' . $GLOBALS['baseUrl'],
            'Origin: https://bill.pitc.com.pk',
        ]);
    }

    $response   = curl_exec($ch);
    $headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
    $httpCode   = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error      = curl_error($ch);
    curl_close($ch);

    if ($error) return ['error' => $error];

    $headers = substr($response, 0, $headerSize);
    $body    = substr($response, $headerSize);

    // Extract cookies from response headers
    preg_match_all('/^Set-Cookie:\s*([^;]+)/mi', $headers, $m);
    $cookies = implode('; ', $m[1]);

    // Extract Location header for redirects
    preg_match('/^Location:\s*(.+)$/mi', $headers, $loc);
    $location = isset($loc[1]) ? trim($loc[1]) : '';

    return compact('httpCode', 'body', 'cookies', 'location');
}

function extract_field($html, $name) {
    $escaped = preg_quote($name, '/');
    if (preg_match('/name="' . $escaped . '"[^>]*value="([^"]*)"/i', $html, $m)) return $m[1];
    if (preg_match('/value="([^"]*)"[^>]*name="' . $escaped . '"/i', $html, $m)) return $m[1];
    return '';
}

// ── Step 1: GET the PITC form page ──────────────────────────────────────────
$step1 = pitc_fetch($baseUrl);
if (isset($step1['error']) || $step1['httpCode'] < 200 || $step1['httpCode'] >= 300) {
    header('Location: ' . $fallback);
    exit;
}

$formHtml      = $step1['body'];
$cookieHeader  = $step1['cookies'];
$viewState     = extract_field($formHtml, '__VIEWSTATE');
$viewStateGen  = extract_field($formHtml, '__VIEWSTATEGENERATOR') ?: '2CDA38AB';
$eventVal      = extract_field($formHtml, '__EVENTVALIDATION');
preg_match('/name="__RequestVerificationToken"[^>]*value="([^"]+)"/i', $formHtml, $rvtM);
$rvt = $rvtM[1] ?? '';

// ── Step 2: POST with session cookie + ASP.NET tokens ───────────────────────
$postData = http_build_query([
    '__EVENTTARGET'              => '',
    '__EVENTARGUMENT'            => '',
    '__LASTFOCUS'                => '',
    '__VIEWSTATE'                => $viewState,
    '__VIEWSTATEGENERATOR'       => $viewStateGen,
    '__EVENTVALIDATION'          => $eventVal,
    '__RequestVerificationToken' => $rvt,
    'rbSearchByList'             => 'refno',
    'searchTextBox'              => $refno,
    'ruCodeTextBox'              => '',
    'btnSearch'                  => 'Search',
]);

$step2 = pitc_fetch($baseUrl, 'POST', $postData, $cookieHeader);
if (isset($step2['error'])) {
    header('Location: ' . $fallback);
    exit;
}

// ── Step 3: Follow redirect ──────────────────────────────────────────────────
$billHtml = '';
if ($step2['httpCode'] >= 300 && $step2['httpCode'] < 400) {
    $location   = $step2['location'];
    $redirectUrl = strpos($location, 'http') === 0
        ? $location
        : 'https://bill.pitc.com.pk' . (strpos($location, '/') === 0 ? $location : '/' . $location);

    $step3    = pitc_fetch($redirectUrl ?: $fallback, 'GET', null, $cookieHeader);
    $billHtml = $step3['body'] ?? '';
} else {
    $billHtml = $step2['body'];
}

if (strlen($billHtml) < 15000) {
    header('Location: ' . $fallback);
    exit;
}

// ── Step 4: Rewrite relative PITC URLs to absolute ──────────────────────────
$billHtml = preg_replace('/<meta\s+charset="utf-16"[^>]*>/i', '<meta charset="utf-8" />', $billHtml);
$billHtml = preg_replace('/(src|href|action)="\/((?!\/)[^"]+)"/i', '$1="https://bill.pitc.com.pk/$2"', $billHtml);
$billHtml = preg_replace('/url\(([\'"]?)\/([^\)\'\"]+)\1\)/i', 'url($1https://bill.pitc.com.pk/$2$1)', $billHtml);

header('Content-Type: text/html; charset=utf-8');
header('Cache-Control: no-store');
header('Access-Control-Allow-Origin: *');
echo $billHtml;
