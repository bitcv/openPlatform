<?php
require_once "OpenPlatform.Config.php";

/*
 * 接口访问类
 * */

class OpenPlatformAPi
{
    public static $rtnData = [];
    /*
     * 获取 code
     * $redirecturl 必选，重定向 URL，
     * $appid appid 必选
     * 如果参数正确，页面将跳转至 redirectUri/?code=CODE&state=STATE。
     * */
    public static function getAuthCode ($redirecturl, $appid)
    {
        $domain = OpenPlatformConfig::DOMAIN;
        $url = "$domain/oauth2/authorize?redirectUri=$redirecturl&appid=$appid&responseType=code&scope=userinfo&state=STATE";
        header("location:$url");
    }

    /*
     * 通过 code 换取网页授权的 accessToken，并拉取用户信息。
     * */

    public static function auth2Login ($code = '')
    {
        $appId = OpenPlatformConfig::APPID;
        $appSecret = OpenPlatformConfig::APPSECRET;
        $domain = OpenPlatformConfig::DOMAIN;
        // 获取 access_token
        $url = $domain.'/oauth2/accessToken?appid='
            . $appId . '&secret='
            . $appSecret . '&code='
            . $code . '&grantType=authorization_code';
        $resJson = file_get_contents($url);
        $resArr = json_decode($resJson, true);
        if (!$resArr || (isset($resArr['errcode']) && $resArr['errcode'])) return false;
        $accessToken = $resArr['data']['accessToken'];
        // 拉取用户信息
        $url = $domain."/api/userinfo?accessToken=$accessToken";
        $resJson = file_get_contents($url);
        $resArr = json_decode($resJson, true);
        if (!$resArr ||  (isset($resArr['errcode']) && $resArr['errcode'])) return false;

        return [
            'hasPaywd' => $resArr['data']['hasPaywd'], //是否设置过支付密码
            'openId' => $resArr['data']['openId'], // 开放平台的 openid
            'nickname' => $resArr['data']['nickname'], // 用户昵称
            'avatarUrl' => $resArr['data']['avatarUrl'], // 用户头像地址
            'inviteCode' => $resArr['data']['inviteCode'], // 邀请码
            'accessToken' => $accessToken, // 用户授权的 accessToken
        ];
    }

    /*
     * 刷新 accessToken （如果需要）
     * $code 根据 appid 从开放平台获取到的 code
     * $refreshToken 获取 accessToken 返回的。accessToken 两个小时过期，过期后可以通过刷新 accessToken 来重新获取 accessToken
     * */

    public static function refreshToken ($refreshToken)
    {
        if (!$refreshToken) {
            return array('errcode' => 100, 'errmsg' => '参数错误');
        }
        $domain = OpenPlatformConfig::DOMAIN;
        $appId = OpenPlatformConfig::APPID;
        $appSecret = OpenPlatformConfig::APPSECRET;
        $url = $domain."/oauth2/refreshToken?appid=".$appId.'&secret='.$appSecret.'&refreshToken='.$refreshToken.'&grantType=refresh_token';
        $resJson = file_get_contents($url);
        $resArr = json_decode($resJson, true);
        if (!$resArr || isset($resArr['errcode']) && $resArr['errcode']) return false;
        return [
            'openid' => $resArr['data']['openId'], // 用户 openid
            'refreshToken' => $resArr['data']['refreshToken'], // refreshToken
            'accessToken' => $resArr['data']['accessToken'], // 用户授权 accessToken
            'expiresIn' => $resArr['data']['expiresIn'], // accessToken 过期时间
        ];

    }

    /*
     * 下定单
     * */
    public function transferOrder ($accessToken = '')
    {
        $nonceStr = random_int(100000,999999);
        $signParams = [
            'appId'     => OpenPlatformConfig::APPID,
            'timestamp' => time(),
            'nonceStr'  => $nonceStr,
            'jsApiList' => '',
            'url'       => '',
        ];
        $signature = self::getSign($signParams,OpenPlatformConfig::APPSECRET); // 获取签名
        $random = rand(1000,9999);

        // 获取 accessToken ,先从开放平台获取 code，用 code 向开放平台换取 accessToken;
        $postData = [
            'accessToken' => $accessToken, // 应用授权接口调用凭证
            'outTradeNo' => 'sdkdemotest'.$random.time(), // 订单号，保证唯一性
            'totalAmount' => '5', // 订单金额
            'productName' => '商品一', // 商品名
            'currency' => 'BOCAI', // 支付的币种
            'payerIp' => $_SERVER['REMOTE_ADDR'], // 用户 ip
            'requestTime' => date('Y-m-d H:i:s', time()),
            'sign' => $signature,
            'memo' => 'memo'
        ];

        $url = OpenPlatformConfig::DOMAIN.'/api/createOrder';
//        $url = 'http://0.0.0.0:8888/api/createOrder';
        $data = self::curlPost($url, $postData);
        $result = json_decode($data,true);
        if ($result['errcode'] == 0) {
            $trade['tradeNo'] = $result['data']['tradeNo'];
            $trade['accessToken'] = $postData['accessToken'];
            $trade['requestTime'] = $postData['requestTime'];
            return json_encode($trade);
        } else {
            return $data;
        }
    }

    /*
     * 获取开放平台的配置
     * */

    public function getConfig ($jsApiList = '', $url = '')
    {
        $nonceStr = random_int(100000,999999);
        $signParams = [
            'appId'     => OpenPlatformConfig::APPID,
            'timestamp' => time(),
            'nonceStr'  => $nonceStr,
            'jsApiList' => $jsApiList,
            'url'       => $url,
        ];
        $signature = self::getSign($signParams,OpenPlatformConfig::APPSECRET);
        $config = [
            'appId'     => OpenPlatformConfig::APPID,
            'timestamp' => time(),
            'nonceStr'  => $nonceStr,
            'signature'  => $signature,
        ];
        return $config;

    }

    /**
     * 生成请求参数签名
     * @param $params
     * @param $secret
     * @return string
     */
    public static function getSign($params, $secret)
    {
        $params_str = "";
        ksort($params);
        reset($params);

        foreach ( $params as $key => $val ) {
            if ($key != "sign" &&  isset ( $val ) && @$val != "") {
                $params_str .= $key . "=" . $val . "&";
            }
        }
        $params_str = substr ($params_str, 0, - 1 );
        $params_str = $params_str .$secret;
        $sign = strtolower ( md5 ( $params_str ) );
        return $sign;
    }


    public static function httpGet($url, $para = array()) {
        $ch = curl_init();
        if ($para) {
            $url .= (strpos($url,'?')>0?'&':'?').http_build_query($para);
        }
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_HEADER, 0);

        $output = curl_exec($ch);

        curl_close($ch);

        return $output;
    }

    /**
     * 通过CURL发送HTTP请求
     * @param string $url  //请求URL
     * @param array $postFields //请求参数
     * @return mixed
     */
    public static function curlPost($url,$postFields){
        $postFields = json_encode($postFields);
        $ch = curl_init ();
        curl_setopt( $ch, CURLOPT_URL, $url );
        curl_setopt( $ch, CURLOPT_HTTPHEADER, array(
                'Content-Type: application/json; charset=utf-8'
            )
        );
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1 );
        curl_setopt( $ch, CURLOPT_POST, 1 );
        curl_setopt( $ch, CURLOPT_POSTFIELDS, $postFields);
        curl_setopt( $ch, CURLOPT_TIMEOUT,1);
        curl_setopt( $ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, 0);
        $ret = curl_exec ( $ch );
        if (false == $ret) {
            $result = curl_error(  $ch);
        } else {
            $rsp = curl_getinfo( $ch, CURLINFO_HTTP_CODE);
            if (200 !== $rsp) {
                $result = "请求状态 ". $rsp . " " . curl_error($ch);
            } else {
                $result = $ret;
            }
        }
        curl_close ( $ch );
        return $result;
    }
}