<?php
header('content-type:application/json;charset=utf-8');
require_once 'OpenPlatform.Config.php';
require_once 'OpenPlatform.Api.php';
session_start();

$openPlatformApi = new OpenPlatformAPi();
$redirectUrl = OpenPlatformConfig::REDIRECTURL;
$appId = OpenPlatformConfig::APPID;
$token = 'a5bba3b9bd36a723';
$accessToken = '';

// 获取开放平台的配置
$url = $_SERVER['REQUEST_URI'];
if (strpos($url, 'getConfig')) {
    $configInfo = $openPlatformApi->getConfig();
    echo json_encode($configInfo);
    return;
} else if (strpos($url, 'transferOrder')) {
    $accessToken = $_SESSION['accessToken'];
    $result = $openPlatformApi->transferOrder($accessToken);
    echo $result;
    return;
}

// 使用 AppID 向开放平台换取 code .如果参数正确，页面将跳转至 redirectUri/?code=CODE&state=STATE。
if (isset($_GET['code'])) {
    $userInfo = $openPlatformApi::auth2Login($_GET['code']);
    if(isset($userInfo) && $userInfo) {
        $accessToken = $userInfo['accessToken'];
        $_SESSION['accessToken'] = $accessToken;
    }
} else {
    $result = $openPlatformApi::getAuthCode($redirectUrl, $appId, $token);
}



// 通过 code 换取网页授权 accessToken
//$code = '23bd460615f0a25844f97a83f3467d16';
//$userInfo = $openPlatformApi::auth2Login($code);
//echo '<pre>';
//print_r($userInfo);
//echo '</pre>';

// 刷新 accessToken
/*$refreshToken = 'd1f79f22f881ca15433309e1f4de2d19';
$openPlatformInfo = $openPlatformApi::refreshToken($refreshToken);
echo '<pre>';
print_r($openPlatformInfo);
echo '</pre>';*/

