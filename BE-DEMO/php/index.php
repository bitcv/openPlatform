<?php
header('content-type:application/json;charset=utf-8');
require_once 'OpenPlatform.Config.php';
require_once 'OpenPlatform.Api.php';
session_start();

$openPlatformApi = new OpenPlatformAPi();
$redirectUrl = OpenPlatformConfig::REDIRECTURL;
$appId = OpenPlatformConfig::APPID;
$domain = OpenPlatformConfig::REDIRECTURL;
$token = '';
// 获取开放平台的配置
$url = $_SERVER['REQUEST_URI'];
if (strpos($url, 'getConfig')) {
    $configInfo = $openPlatformApi->getConfig();
    echo json_encode($configInfo);
    return;
} else if (strpos($url, 'transferOrder')) {
    if (isset($_SESSION['hasAccessToken'])) {
        if ($_SESSION['hasAccessToken']['expire'] > time()) {
            $result = $openPlatformApi->transferOrder($_SESSION['hasAccessToken']['accessToken']);
            echo $result;
            return;
        } else {
            unset($_SESSION['hasAccessToken']);
            header("location:http://sdkdemo.bitcv.cn/index.php");
        }
    }
}

// 使用 AppID 向开放平台换取 code .如果参数正确，页面将跳转至 redirectUri/?code=CODE&state=STATE。
if (isset($_GET['code'])) {
    if (!isset($_SESSION['accessToken'])) {
        $userInfo = $openPlatformApi::auth2Login($_GET['code']);
        if (isset($userInfo) && $userInfo) {
            $session_data = array();
            $session_data['expire'] = time() + 7200;
            $session_data['accessToken'] = $userInfo['accessToken'];
            $_SESSION['hasAccessToken'] = $session_data;
            if ($_SESSION['hasAccessToken']['accessToken'] && $_SESSION['hasAccessToken']['expire'] > time()) {
                header("location:http://sdkdemo.bitcv.com/demo/demo.html");
            }
        }
    } else {
        header("location:http://sdkdemo.bitcv.com/demo/demo.html");
    }
} else {
    $result = $openPlatformApi::getAuthCode($redirectUrl, $appId, $token);
}

