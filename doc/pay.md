## 支付相关

### 创建收款订单

**请求URL：** 
- ` https://open.bitcv.com/api/createOrder `

**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|accessToken |是  |string |应用授权接口调用凭证   |
|outTradeNo |是  |string |第三方应用订单号，商户内部保证唯一   |
|totalAmount     |是  |string | 订单金额    |
|productName     |是 |string | 产品名称    | 
|currency     |是  |string | 支付币种，限币威钱包支持币种。例：BCV  |
|payerIp     |是  |string | 支付用户IP    |
|requestTime     |是  |string | 请求时间    |
|memo     |否  |string | 说明信息，原文返回。第三方应用可根据需要存放需要在响应时带回的信息。|
|sign     |是  |string | 签名    |

 **返回示例**

```  JSON
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
|:-----  |:-----|-----|
|tradeNo |string   |开放平台订唯一单号  |


### 交易结果通知

用户完成订单支付后，系统异步回调通知地址，将最终的订单处理结果通知给外部系统，以POST请求发送。

### 通知请求签名机制

在请求参数列表中，除去sign参数外，其他非空参数都要参与签名生成， 签名机制与[后端签名机制](./sign.md) 所述相同

**参数：** 

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|outTradeNo |是  |string |第三方应用订单号   |
|memo |是  |string | 说明信息，与请求中memo内容一致    |
|tradeStatus |是  |string |交易状态，详见“交易状态”说明|
|timeStamp     |是  |string | 异步回调通知发起时间    |
|tradeTime     |是  |string | 订单交易时间    |


### 订单查询

**请求URL：** 
- ` https://open.bitcv.com/api/order `
  
**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|appid |是  |string |第三方应用的唯一标识   |
|secret |是  |string | 第三方应用的密钥    |
|tradeNo |是  |string |开放平台订唯一单号|
|sign     |是  |string | 签名    |

 **返回示例**

``` 
{
    "errcode": 0,
    "errmsg": "成功执行",
    "data": {
        "tradeNo": "BW1807111801179ED1Y",
        "outTradeNo": "070dbc07002226b2",
        "totalAmount": "10.36",
	"productName": "productName",
        "currency": "BCV",
        "tradeStatus": "TRADE_FINISHED",
        "openid": "070dbc07002226b2",
        "orderTime": "2018-07-11 18:01:17",
        "tradeTime": "2018-07-11 18:01:17",
        "payerIp": "8.8.8.8"
    }
}
```

 **返回参数说明** 

|参数名|类型|说明|
|:-----  |:-----|-----                           |
|tradeNo |string   |开放平台唯一订单号  |
|outTradeNo |string   |第三方应用订单号，商户内部保证唯一  |
|totalAmount     |string | 订单金额    |
|productName     |string | 产品名称    |
|openid     |string | 用户在开放平台唯一标识    |
|currency     |string | 支付币种    |
|tradeStatus |string |订单状态   |
|orderTime |string |订单创建时间   |
|tradeTime |string |订单支付时间   |
|payerIp     |string | 支付用户IP    |

 **交易状态** 

|参数名|说明|
|:-----  |-----                           |
|WAIT_PAY  |等待付款(系统不会异步通知)  |
|PAY_FINISHED |已付款(系统会异步通知) |
|TRADE_FAILED |交易失败(系统会异步通知)  |
|TRADE_FINISHED |交易结束(系统会异步通知)  |
|TRADE_CLOSED |交易关闭（合作方通过调用交易取消接口来关闭）(系统会异步通知) |



### 给个人用户转账

**请求URL：** 
- ` https://open.bitcv.com/api/transfer `
  
**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:----    |:---|:----- |-------   |
|appid |是  |string | 第三方应用的唯一标识    |
|secret |是  |string | 第三方应用的密钥    |
|transNo |是  |string | 转账批次号，保证唯一    |
|tradeList     |是  |string | 交易列表，参数间用“^”分割，条目间用“~”分割，参数格式详见“参数格式说明”,最多支持10条转账数据   |
|requestTime     |是  |string | 请求时间    |
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

**tradeList参数支持手机号或openid：** openid|mobile^currency^totalAmount~

|参数名|类型|说明|
|:-----  |:-----|-----                           |
|openid |string   |接受转账用户在开放平台唯一标识  |
|mobile |string   |接受转账用户的手机号  |
|currency |string   |支付币种  |
|totalAmount |string   |订单金额  |

 **openid参数示例**
 070dbc07002226b2^BCV^19.2~5966c7bdacaa47b9bf59ca85144a8c47^ETH^3.4

 **手机号参数示例**
 13801088888^BCV^19.2~13901099999^ETH^3.4



