## 企业账号付款相关

用户支付给企业账号参考(./pay.md)


### 企业账号给个人用户转账

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



