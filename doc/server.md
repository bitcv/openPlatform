# 目录
- [服务端接口](#服务端接口)
  - [注册/登录](#注册登录)
  - [获取用户收款地址](#获取用户收款地址)
  - [获取转账记录](#获取转账记录)
  - [获取用户持有通证数量](#获取用户持有通证数量)
  - [企业账号给用户转账](#企业账号给用户转账)
- [服务端回调接口](#服务端回调接口)
  - [转账成功回调](#转账成功回调)

## 通用错误码

|错误码|说明|
|:-----|:---|
|100|参数错误|
|105|签名错误|
|302|未登录|

## 服务端接口
### 注册/登录
**请求URL：** 
- ` https://www.bitcv.com/api/sdk_server/signin `

**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:-----|:---|:---|----|
|appKey|是|string|第三方应用唯一标识|
|sign|是|string|服务端签名|
|nation|是|int|国家码|
|mobile|是|string|用户手机号|

**返回示例**
```JSON
{
    "errcode": 0,
    "errmsg": "成功执行",
    "data": {}
}
```

**返回参数说明** 

|参数名|类型|说明|
|:-----|:---|----|

**备注** 

### 获取用户收款地址
**请求URL：** 
- ` https://www.bitcv.com/api/sdk_server/getUserWallet`

**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:-----|:---|:---|----|
|appKey|是|string|第三方应用唯一标识|
|sign|是|string|服务端签名|
|nation|是|int|国家码|
|mobile|是|string|用户手机号|

**返回示例**
```JSON
{
    "errcode": 0,
    "errmsg": "成功执行",
    "data": {
        "addr": "0x8bb7e6aa37417dbd8e7aa51f01290cfd1ea00170"
    }
}
```

**返回参数说明** 

|参数名|类型|说明|
|:-----|:---|----|
|addr|string|收款地址|

**备注** 

### 获取转账记录
**请求URL：** 
- ` https://www.bitcv.com/api/sdk_server/getFinanceList `

**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:-----|:---|:---|----|
|appKey|是|string|第三方应用唯一标识|
|sign|是|string|服务端签名|
|mobile|否|string|用户手机号（不传则不按此字段过滤）|
|status|否|int|转账状态：1进行中2已完成（不传则不按此字段过滤）|
|typeStr|否|逗号分隔字符串|转账类型字符串（如：1,3）（转账类型：1平台外转入，2平台外转出，3平台内转入，4平台内转出）|
|perpage|是|int|每页数据条数，大于等于1，小于等于500|
|pageno|是|int|页码，从1开始|


**返回示例**
```JSON
{
    "errcode": 0,
    "errmsg": "成功执行",
    "data": {
        "dataCount": 1,
        "dataList": [
            {
                "id": 4,
                "orderNum": "2019011201003884",
                "type": 3,
                "typeStr": "平台内收款",
                "title": "收款",
                "iconUrl": "https://www.bitcv.com/app_static/icon/finance_in_cn.png",
                "status": 2,
                "statusStr": "已完成",
                "tokenId": 41,
                "tokenSymbol": "AAC",
                "mobile": "18514429019",
                "costTime": 0,
                "amount": 100,
                "fromAddr": "0x339150205060cdd430638c878909e603ce8f3a49",
                "toAddr": "bcvgiveumore",
                "createdAt": "2018-12-01 19:20:48"
            }
        ]
    }
}
```

**返回参数说明** 

|参数名|类型|说明|
|:-----|:---|----|
|id|int|转账记录ID|
|type|int|转账类型：1平台外转入，2平台外转出，3平台内转入，4平台内转出|
|typeStr|string|转账类型描述|
|title|string|标题|
|iconUrl|string|转账图标url|
|status|int|状态：1进行中2已完成|
|statusStr|string|转账状态描述|
|tokenId|int|转账通证ID|
|amount|float|转账数量|
|fromAddr|string|转出地址|
|toAddr|string|转入地址|
|tokenSymbol|string|通证符号|
|mobile|string|用户手机号|
|costTime|float|转账耗时（min）|
|createdAt|string|转账发起时间|


**备注** 

### 获取用户持有通证数量
**请求URL：** 
- ` https://www.bitcv.com/api/sdk_server/getUserTokenAmount `

**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:-----|:---|:---|----|
|nation|是|int|用户手机号国家码|
|mobile|是|string|用户手机号|
|appKey|是|string|第三方应用唯一标识|
|sign|是|string|服务端签名|

**返回示例**
```JSON
{
    "errcode": 0,
    "errmsg": "成功执行",
    "data": {
        "symbol": "TS",
        "amount": 10
    }
}
```

**返回参数说明** 

|参数名|类型|说明|
|:-----|:---|----|
|symbol|string|通证符号|
|amount|float|通证数量|

### 企业账号给用户转账
**请求URL：** 
- ` https://www.bitcv.com/api/sdk_server/tranTokenServer `

**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:-----|:---|:---|----|
|nation|是|int|收款用户手机号国家码|
|mobile|是|string|收款用户手机号|
|tokenId|是|int|转账通证ID|
|amount|是|float|转账数量|
|state|否|string|额外参数|
|appKey|是|string|第三方应用唯一标识|
|sign|是|string|服务端签名|

**返回示例**
```JSON
{
    "errcode": 0,
    "errmsg": "成功执行",
    "data": {}
}
```

**返回参数说明** 

## 服务端回调接口
### 转账成功回调
**请求URL：** 
- 第三方可配置：`http://api.callback.server`

**请求方式：**
- POST 

**参数：** 

|参数名|类型|说明|
|:----|:--|----|
|id|int|转账记录ID|
|orderId|string|转账订单ID|
|mobile|string|用户手机号|
|type|int|转账类型：1平台外转入，2平台外转出，3平台内转入，4平台内转出|
|typeStr|string|转账类型描述|
|title|string|标题|
|iconUrl|string|转账图标url|
|status|int|2已完成|
|statusStr|string|转账状态描述|
|tokenId|int|转账通证ID|
|tokenSymbol|string|通证符号|
|amount|float|转账数量|
|fromAddr|string|转出地址|
|toAddr|string|转入地址|
|txTime|string|交易时间|
|scope|string|转账时传入的额外参数|

**返回示例**
```JSON
{
    "errcode": 0,
    "errmsg": "成功执行",
    "data": {},
}
```
**备注** 

