## 网页登录授权
如果用户在币威钱包客户端中访问第三方网页，可以通过币威钱包网页授权机制，来获取用户基本信息，进而实现业务逻辑。

具体而言，网页授权流程分为四步：
1. 引导用户进入开放平台提供的第三方入口链接，获取code
2. 通过code换取网页授权accessToken
3. 如果需要，开发者可以刷新网页授权accessToken，避免过期
4. 通过网页授权accessToken和openid获取用户基本信息

### 第一步：获取code
提供接收code的回调域名给币威钱包对接人员做为应用入口，由工作人员生成应用链接，并配置到币威钱包中。用户点击应用链接，会携带code访问第三方提供的回调域名。

请注意：接收code的回调域名，应当使用https链接来确保授权code的安全性。

跳转链接示例：
```
https://open.bitcv.com/oauth2/authorize?redirectUri=http://example.com&appid=bcvrEueUXfCZb3id&responseType=code&scope=userinfo&state=STATE
```

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|appid |是  |string |公众号的唯一标识|
|responseType |是  |string |返回类型，请填写code   |
|redirectUri |是  |string |授权后重定向的回调链接地址， 请使用 urlEncode 对链接进行处理|
|scope     |是  |string | 应用授权作用域，请填写userinfo    |
|state |否  |string |重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节|

**返回说明**

如果参数正确，页面将跳转至 redirectUri/?code=CODE&state=STATE。

### 第二步：通过code换取网页授权accessToken
第三方平台可通过下述接口来获取网页授权accessToken。
请注意：由于公众号的secret和获取到的accessToken安全级别都非常高，必须只保存在服务器，不允许传给客户端。后续刷新accessToken、通过accessToken获取用户信息等步骤，也必须从服务器发起。

**请求方法**

获取code后，请求以下链接获取accessToken：

```
https://open.bitcv.com/oauth2/accessToken?code=177d9b4c15c80f145f59b1b23eb71c60&appid=APPID&secret=SECRET&grantType=authorizationCode
```

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|code |是  |string |填写第一步获取的code参数   |
|appid |是  |string |第三方的唯一标识|
|secret |是  |string |第三方的appsecret|
|grantType     |是  |string | 填写为authorizationCode    |


**返回说明**

正确时返回的JSON数据包如下：
``` JSON
{ 
  "accessToken":"ACCESS_TOKEN",
  "expiresIn":7200,
  "refreshToken":"REFRESH_TOKEN",
  "openId":"OPENID"
}
```

|参数名|说明|
|:----    |-----   |
|accessToken |网页授权接口调用凭证   |
|refreshToken  |用户刷新accessToken|
|expiresIn |accessToken接口调用凭证超时时间，单位（秒）|
|openId  | 	用户唯一标识    |

错误时会返回JSON数据包如下（示例为code无效错误）:
``` JSON
{
  "errcode":40029,
  "errmsg":"invalid code"
}
```

### 第三步：刷新accessToken（如果需要）
由于accessToken拥有较短的有效期，当accessToken超时后，可以使用refreshToken进行刷新，refreshToken有效期为30天，当refreshToken失效之后，需要用户重新授权。

**请求方法**

获取第二步的refresh_token后，请求以下链接获取accessToken：
```
https://open.bitcv.com/oauth2/refreshToken?appid=APPID&secret=SECRET&grantType=refreshToken&refreshToken=REFRESH_TOKEN
```

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|code |是  |string |填写第一步获取的code参数   |
|appid |是  |string |第三方的唯一标识|
|secret |是  |string |第三方的appsecret|
|grantType     |是  |string | 填写为refreshToken    |

**返回说明**

正确时返回的JSON数据包如下：
```JSON
{ 
  "accessToken":"ACCESS_TOKEN",
  "expiresIn":7200,
  "refreshToken":"REFRESH_TOKEN",
  "openId":"OPENID"
}
```

|参数名|说明|
|:----    |-----   |
|accessToken |网页授权接口调用凭证   |
|refreshToken  |用户刷新accessToken|
|expiresIn |accessToken接口调用凭证超时时间，单位（秒）|
|openId  | 	用户唯一标识    |

错误时微信会返回JSON数据包如下（示例为code无效错误）:
``` JSON
{
  "errcode":40029,
  "errmsg":"invalid code"
}
```

### 第四步：拉取用户信息
开发者可以通过accessToken和openid拉取用户信息了。

**请求方法**
```
http：GET（请使用https协议）：
https://open.bitcv.com/api/userinfo?accessToken=ACCESS_TOKEN
```

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|accessToken |是  |string |网页授权接口调用凭证|

**返回说明**

正确时返回的JSON数据包如下：
``` JSON
{ 
  "nickname":"NICKNAME",
  "hasPaywd":1,
  "avatarUrl":"http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ4IMAibbqsTgEpiapq9iaN4EnaALWYlic7cticqbjuTFU5XIFygL9SKA1bJxdqsuMK1lHK754WAeeXeVQ/132",
  "openId":"OPENID",
  "hasPaywd": 0,
  "inviteCode": "INVITECODE"
}
```

|参数名|类型|说明|
|:-----  |:-----|-----  |
|avatarUrl |string   |用户头像  |
|nickname |string   |用户昵称  |
|openId |string   |用户在开放平台唯一标识  |
|hasPaywd |int   |是否设置过支付密码  |
|inviteCode |string   |邀请码  |

错误时微信会返回JSON数据包如下（示例为code无效错误）:

``` JSON
{
  "errcode":40014,
  "errmsg":"Illegal accessToken"
}
```

