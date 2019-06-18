# 目录

- [获取支持的token列表](#退出登录)
- [获取订单信息](#获取订单信息)
- [支付回调](#支付回调)

## 通用错误码

|错误码|说明|
|:-----|:---|
|100|参数错误|
|105|签名错误|
|302|未登录|


### 获取支持的token列表
**请求URL：** 
- ` https://sdk.bitcv.com/api/sdk_server/getPayTokenList `

**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:-----|:---|:---|----|
|appKey|是|string|第三方应用唯一标识|
|sign|是|string|服务端签名|

**返回示例**
```JSON
{
    "errcode": 0,
    "errmsg": "成功执行",
    "data": [{
        "tokenId": 4,
        "tokenSymbol": "BCV",
    }],
}
```

**返回参数说明** 

|参数名|类型|说明|
|:-----|:---|----|
|tokenId|int|通证ID|
|tokenSymbol|string|通证符号|

**备注** 

### 获取支持的token列表
**请求URL：** 
- ` https://sdk.bitcv.com/api/sdk_server/getOrderData `

**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:-----|:---|:---|----|
|appKey|是|string|第三方应用唯一标识|
|outTradeNo|是|string|第三方唯一订单号|
|sign|是|string|服务端签名|

**返回示例**
```JSON
{
    "errcode": 0,
    "errmsg": "成功执行",
    "data": {
        "tradeNo": "BW190618114322FDF9V",
        "outTradeNo": "TEST1560829401",
        "productName": "商品",
        "payAmount": "1",
        "payTokenId": 4,
        "payTokenSymbol": "BCV",
        "memo": "memo",
        "status": "success",
        "tradeTs": 1560829402,
        "requestTs": 1560829401,
        "expireTs": 1560833001
    }
}
```

**返回参数说明** 

|参数名|类型|说明|
|:-----|:---|----|
|tradeNo|string|唯一交易号|
|outTradeNo|string|第三方平台唯一订单号|
|productName|string|产品名称|
|payTokenId|int|支付通证ID|
|payTokenSymbol|string|支付通证缩写|
|payAmount|float|支付数量|
|memo|string|备注|
|status|string|支付状态(success, failed)|
|tradeTs|int|交易时间戳|
|requestTs|int|请求时间戳|
|expireTs|int|交易过期时间戳|

**备注** 

### 转账成功回调
**请求URL：** 
- 第三方配置URL：`http://api.callback.server`

**请求方式：**
- POST 

**参数：** 

|参数名|类型|说明|
|:----|:--|----|
|tradeNo|string|唯一交易号|
|outTradeNo|string|第三方平台唯一订单号|
|productName|string|产品名称|
|payTokenId|int|支付通证ID|
|payTokenSymbol|string|支付通证缩写|
|payAmount|float|支付数量|
|memo|string|备注|
|status|string|支付状态(success, failed)|
|tradeTs|int|交易时间戳|
|requestTs|int|请求时间戳|
|expireTs|int|交易过期时间戳|

**返回示例**
```JSON
{
    "errcode": 0,
    "errmsg": "成功执行",
    "data": {},
}
```
**备注** 

