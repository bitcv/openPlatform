## 币威开放平台

币威开放平台为第三方开发者提供接入使用币威钱包的一系列服务，包括利用币威钱包完成用户登录、支付等操作。

#### 接入指南
接入币威开放平台，开发者需要按照如下步骤进行：
- ###### 联系币威团队开通开发权限
  邮箱：
  手机：
- ###### 提交服务器配置
成为开发者后，币威会为第三方开发者提供相关 appId、appsecret等账号信息，同时第三方开发者也需向币威提供服务器回调地址(URL)等信息。
- ###### 验证配置成功，开始开发

#### 签名机制

1. 请求的所有参数，需要根据参数名=参数值的格式，按首字符字典顺序（ascii值大小）排序，若遇到相同首字符，则判断第二个字符，以此类推，待签名字符串需要以“参数名1=参数值1&参数名2=参数值2&….&参数名N=参数值N”的规则进行拼接。
2. 在对请求的参数做签名时，这些参数必须来源于请求参数列表，并且除去列表中的参数sign。
3. 在对请求的参数做签名时，对于请求参数列表中那些可空的参数，如果选择使用它们，那么这些参数的参数值必须不能为空或空值。
4. 待签名数据应该是参数原始值而不是url encoding之后的值，例如：调用某接口需要对请求参数email进行数字签名，那么待签名数据应该是email=test@example.com，而不是email=test%40example.com。

#### 生成待签名字符串

1.需要参与签名的参数
在请求参数列表中，除去sign、sign_type、sign_version三个参数外，其他需要使用到的参数皆是要签名的参数。
在通知返回参数列表中，除去sign、sign_type、sign_version三个参数外，凡是通知返回回来的参数皆是要签名的参数
2.生成待签名字符串
对于如下的参数数组：
```
string[] parameters={
	“appid=2088002018018916”,
	“return_url=http://www.example.com/return_url”,
	“out_trade_no=BW96511872899679”,
	“subject=iPhone plus”,
	“price=32”,
	“quantity=1”,
	“seller_email=test@example.com”
};
```
对数组里的每一个值从a到z的顺序排序，若遇到相同首字母，则看第二个字母，以此类推。
排序完成之后，再把所有数组值以“&”字符连接起来，如：
```
appid=2088002007018916&out_trade_no=BW96511872899679&price=32&quantity=1&return_url=http://www.example.com/return_url&seller_email=test@example.com&subject=iPhoneplus
```
这串字符串便是待签名字符串。
将待签名字符串与第三方平台APP_SECRET拼接再进行MD5散列即是最终的签名参数。

#### 注意：
1.没有值的参数无需传递，也无需包含到待签名数据中；
2..签名串必须验证通过后才能进行业务处理。
根据HTTP协议要求，传递参数的值中如果存在特殊字符（如：&、@等），那么该值需要做URL Encoding，这样请求接收方才能接收到正确的参数值。这种情况下，待签名数据应该是原生值而不是encoding之后的值。例如：调用某接口需要对请求参数email进行数字签名，那么待签名数据应该是email=test@example.com，而不是email=test%40example.com。

#### 网页授权
如果用户在币威钱包客户端中访问第三方网页，可以通过币威钱包网页授权机制，来获取用户基本信息，进而实现业务逻辑。

具体而言，网页授权流程分为四步：

1、用户点击开放平台提供的第三方入口链接，第三方平台获取code

2、通过code换取网页授权accessToken

3、如果需要，开发者可以刷新网页授权accessToken，避免过期

4、通过网页授权accessToken和openid获取用户基本信息

**第一步：获取code**

提供接收code的链接给币威钱包对接人员做为应用入口，由工作人员生成应用链接，并配置到币威钱包中。
用户点击应用链接，会携带code访问第三方提供的code接收链接。
请注意：接收code的链接，应当使用https链接来确保授权code的安全性。
请求以下链接获取code：
```
https://open.bitcv.com/oauth2/authorize?redirectUri=http://example.com&appid=bcvrEueUXfCZb3id&token=e30f4b4f933d2343&responseType=code&scope=userinfo
```

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|appid |是  |string |公众号的唯一标识|
|responseType |是  |string |返回类型，请填写code   |
|redirectUri |是  |string |授权后重定向的回调链接地址， 请使用 urlEncode 对链接进行处理|
|scope     |是  |string | 应用授权作用域，请填写snsapi_userinfo    |
|state |否  |string |重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节|

返回说明

如果参数正确，页面将跳转至 redirectUri/?code=CODE&state=STATE。

**第二步：通过code换取网页授权accessToken**

第三方平台可通过下述接口来获取网页授权accessToken。
请注意：由于公众号的secret和获取到的accessToken安全级别都非常高，必须只保存在服务器，不允许传给客户端。后续刷新accessToken、通过accessToken获取用户信息等步骤，也必须从服务器发起。

***请求方法***

获取code后，请求以下链接获取accessToken：
```
https://open.bitcv.com/oauth2/accessToken?code=177d9b4c15c80f145f59b1b23eb71c60&appid=APPID&secret=SECRET&grantType=authorizationCode
```

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|code |是  |string |填写第一步获取的code参数   |
|appid |是  |string |第三方的唯一标识|
|secret |是  |string |第三方的appsecret|
|grantType     |是  |string | 填写为authorization_code    |

返回说明

正确时返回的JSON数据包如下：
```
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
{"errcode":40029,"errmsg":"invalid code"}

**第三步：刷新accessToken（如果需要）**
由于accessToken拥有较短的有效期，当accessToken超时后，可以使用refreshToken进行刷新，refreshToken有效期为30天，当refreshToken失效之后，需要用户重新授权。

***请求方法***
```
获取第二步的refresh_token后，请求以下链接获取accessToken：
https://open.bitcv.com/oauth2/refreshToken?appid=APPID&secret=SECRET&grantType=refreshToken&refreshToken=REFRESH_TOKEN
```

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|code |是  |string |填写第一步获取的code参数   |
|appid |是  |string |第三方的唯一标识|
|secret |是  |string |第三方的appsecret|
|grantType     |是  |string | 填写为authorization_code    |

返回说明

正确时返回的JSON数据包如下：
```
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
{"errcode":40029,"errmsg":"invalid code"}

**第四步：拉取用户信息**
开发者可以通过accessToken和openid拉取用户信息了。

***请求方法***
```
http：GET（请使用https协议）：
https://open.bitcv.com/api/userinfo?accessToken=ACCESS_TOKEN
```

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|accessToken |是  |string |网页授权接口调用凭证|

返回说明

正确时返回的JSON数据包如下：
```
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
|:-----  |:-----|-----                           |
|avatarUrl |string   |用户头像  |
|nickname |string   |用户昵称  |
|openId |string   |用户在开放平台唯一标识  |
|hasPaywd |int   |是否设置过支付密码  |
|inviteCode |string   |邀请码  |

错误时微信会返回JSON数据包如下（示例为code无效错误）:
{"errcode":40014,"errmsg":"Illegal accessToken"}

#### OTC订单

**创建OTC订单接口** 


**请求URL：** 
- ` https://open.bitcv.com/api/otc/createOrder `
  
**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|accessToken |是  |string |应用授权接口调用凭证   |
|outTradeNo |是  |string |第三方应用订单号，商户内部保证唯一   |
|tokenAmount     |是  |string | 交易数字货币数量    |
|tokenPrice     |是 |string | 币种单价    |
|currency     |是  |string | 交易币种    |
|sign     |是  |string | 签名    |

 **返回示例**

``` 
  {
    "errcode": 0,
    "errmsg": "成功执行",
    "data": {
        "tradeNo": "BW1807121440270962J"
    }
}
```

 **返回参数说明** 

|参数名|类型|说明|
|:-----  |:-----|-----                           |
|tradeNo |string   |开放平台订唯一单号  |

 **备注** 

- 更多返回错误代码请看首页的错误代码描述


    
**执行OTC订单接口** 


**请求URL：** 
- ` https://open.bitcv.com/api/otc/tradeOrder `
  
**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|appid |是  |string | 第三方应用的唯一标识    |
|secret |是  |string | 第三方应用的密钥    |
|tradeNo |是  |string |OTC订单号 |
|sign     |是  |string | 签名    |

 **返回示例**

``` 
  {
    "errcode": 0,
    "errmsg": "成功执行",
    "data": {
        "success": true
    }
}
```

 **返回参数说明** 

|参数名|类型|说明|
|:-----  |:-----|-----                           |
|success |string   |是否成功  |

 **备注** 

- 更多返回错误代码请看首页的错误代码描述



    
**取消OTC订单接口** 


**请求URL：** 
- ` https://open.bitcv.com/api/otc/cancelOrder `
  
**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|appid |是  |string | 第三方应用的唯一标识    |
|secret |是  |string | 第三方应用的密钥    |
|outTradeNo |是  |string |OTC订单号 |
|sign     |是  |string | 签名    |

 **返回示例**

``` 
  {
    "errcode": 0,
    "errmsg": "成功执行",
    "data": {
        "success": true
    }
}
```

 **返回参数说明** 

|参数名|类型|说明|
|:-----  |:-----|-----                           |
|success |string   |是否成功  |


#### 币威用户登录授权
如果用户在币威客户端中访问第三方网页，第三方开发者可以通过币威用户授权机制，来获取用户基本信息，进而实现业务逻辑。

#### [币威  JS-SDK 使用文档](./doc/JS-SDK.md)
通过使用币威 JS-SDK，网页开发者可借助币威APP使用登录、支付等能力，未来还将开放更多如分享、扫一扫等功能。