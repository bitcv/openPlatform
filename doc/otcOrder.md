## OTC 订单相关


### 创建OTC订单接口

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




### 取消OTC订单接口

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

``` JSON
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
|:-----  |:-----|----- |
|success |string   |是否成功  |
