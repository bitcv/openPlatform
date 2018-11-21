# 目录
- [服务端接口](#服务端接口)
  - [注册/登录](#注册登录)
- [客户端接口](#客户端接口)
  - [退出登录](#退出登录)
  - [获取用户资产](#获取用户资产)
  - [获取用户资产列表](#获取用户资产列表)
  - [获取币种列表](#获取币种列表)
  - [搜索币种列表](#搜索币种列表)
  - [添加用户资产](#添加用户资产)
  - [隐藏用户资产](#隐藏用户资产)
  - [获取用户钱包地址列表](#获取用户钱包地址列表)
  - [获取用户钱包地址](#获取用户钱包地址)
  - [获取用户特定币种的钱包地址](#获取用户特定币种的钱包地址)
  - [扫一扫解析地址信息](#扫一扫解析地址信息)
  - [校验地址格式](#校验地址格式)
  - [获取转账币种列表](#获取转账币种列表)
  - [获取转账服务费信息](#获取转账服务费信息)
  - [转账](#转账)
  - [校验支付密码](#校验支付密码)
  - [发送验证码](#发送验证码)
  - [设置支付密码](#设置支付密码)
  - [验证谷歌验证码](#验证谷歌验证码)
  - [获取谷歌验证码私钥](#获取谷歌验证码私钥)
  - [设置谷歌验证码](#设置谷歌验证码)
  - [获取转账记录列表](#获取转账记录列表)
  - [获取转账记录详情](#获取转账记录详情)
  - [获取常用地址列表](#获取常用地址列表)
  - [获取常用地址](#获取常用地址)
  - [添加常用地址](#添加常用地址)
  - [修改常用地址](#修改常用地址)
  - [删除常用地址](#删除常用地址)

## 通用错误码

|错误码|说明|
|:-----|:---|
|100|参数错误|
|105|签名错误|
|302|未登录|

## 服务端接口
### 注册/登录
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/signin `

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
        "token": "Df5g1jV7dEL4o9bZegJG"
    }
}
```
**返回参数说明** 

|参数名|类型|说明|
|:-----|:---|----|
|token|string|用户身份唯一标识|

**备注** 
- 如果未注册，则直接注册

## 客户端接口
### 退出登录
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/signout `

**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:-----|:---|:---|----|
|appKey|是|string|第三方应用唯一标识|
|token|是|string|用户身份唯一标识|
|sign|是|string|服务端签名|

**返回示例**
```JSON
{
    "errcode": 0,
    "errmsg": "成功执行",
}
```

**备注** 
### 获取用户资产
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/getUserAsset `

**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:-----|:---|:---|----|
|tokenId|是|int|通证ID|
|appKey|是|string|第三方应用唯一标识|
|token|是|string|用户唯一标识|
|sign|是|string|客户端签名|

**返回示例**
```JSON
{
    "errcode": 0,
    "errmsg": "成功执行",
    "data": {
        "tokenId": 4,
        "tokenSymbol": "BCV",
        "hasTag": 0,
        "logoUrl": "https://static.ucai.net/storage/image/logo/RRhDcW5lrxgNpzpsBxSRF5qxZ6vTAG07bA3Chdge.png",
        "price": "0.10",
        "priceCNY": "0.10",
        "priceStr": "0.10",
        "amount": "0.0000",
        "amountStr": "0.0000",
        "value": "0.00",
        "valueStr": "0.00"
    }
}
```
**返回参数说明** 

|参数名|类型|说明|
|:-----|:---|----|

**备注** 

### 获取用户资产列表
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/getUserAssetList `

**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:-----|:---|:---|----|
|appKey|是|string|第三方应用唯一标识|
|token|是|string|用户唯一标识|
|sign|是|string|客户端签名|

**返回示例**
```JSON
{
    "errcode": 0,
    "errmsg": "成功执行",
    "data": {
        "totalValue": "0.00",
        "totalValueStr": "0.00",
        "dataList": [
            {
                "tokenId": 4,
                "amount": "0.0000",
                "tokenSymbol": "BCV",
                "tokenProtocol": 1,
                "logoUrl": "https://static.ucai.net/storage/image/logo/RRhDcW5lrxgNpzpsBxSRF5qxZ6vTAG07bA3Chdge.png",
                "price": "0.109",
                "value": "0.000",
                "order": 10001,
                "priceCNY": "0.109",
                "priceStr": "0.109",
                "amountStr": "0.0000",
                "valueStr": "0.000",
                "hasTag": 0
            },
        ]
    }
}
```
**返回参数说明** 

|参数名|类型|说明|
|:-----|:---|----|
|token|string|客户端调用接口必须凭证|

**备注** 
- 如果未注册，则直接注册

### 获取币种列表
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/getTokenList `

**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:-----|:---|:---|----|
|appKey|是|string|第三方应用唯一标识|
|token|是|string|用户唯一标识|
|sign|是|string|客户端签名|

**返回示例**
```JSON
{
    "errcode": 0,
    "errmsg": "成功执行",
    "data": {
        "tokenList": {
            "E": [
                {
                    "id": 1,
                    "name": "LXT",
                    "symbol": "EOS",
                    "logoUrl": "",
                    "protocol": 0,
                    "isShow": 1,
                    "hasTag": 0
                }
            ]
        }
    }
}
```
**返回参数说明** 

|参数名|类型|说明|
|:-----|:---|----|

**备注** 

### 搜索币种列表
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/searchTokenList `

**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:-----|:---|:---|----|
|keyword|否|string|过滤关键字|
|appKey|是|string|第三方应用唯一标识|
|token|是|string|用户唯一标识|
|sign|是|string|客户端签名|

**返回示例**
```JSON
{
    "errcode": 0,
    "errmsg": "成功执行",
    "data": {
        "tokenList": [
            {
                "id": 4,
                "name": "BitCapitalVendorToken",
                "symbol": "BCV",
                "logoUrl": "https://static.ucai.net/storage/image/logo/RRhDcW5lrxgNpzpsBxSRF5qxZ6vTAG07bA3Chdge.png",
                "protocol": 1,
                "isShow": 0,
                "hasTag": 0
            },
        ]
    }
}
```
**返回参数说明** 

|参数名|类型|说明|
|:-----|:---|----|

**备注** 

### 添加用户资产
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/addUserAsset `

**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:-----|:---|:---|----|
|tokenId|是|int|通证ID|
|appKey|是|string|第三方应用唯一标识|
|token|是|string|用户唯一标识|
|sign|是|string|客户端签名|

**返回示例**
```JSON
{
    "errcode": 0,
    "errmsg": "成功执行",
}
```
**备注** 

### 隐藏用户资产
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/hideUserAsset `

**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:-----|:---|:---|----|
|tokenId|是|int|通证ID|
|appKey|是|string|第三方应用唯一标识|
|token|是|string|用户唯一标识|
|sign|是|string|客户端签名|

**返回示例**
```JSON
{
    "errcode": 0,
    "errmsg": "成功执行",
}
```
**备注** 


### 获取用户钱包地址列表
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/getWalletList `

**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:-----|:---|:---|----|
|appKey|是|string|第三方应用唯一标识|
|token|是|string|用户唯一标识|
|sign|是|string|客户端签名|

**返回示例**
```JSON
{
    "errcode": 0,
    "errmsg": "成功执行",
    "data": {
        "walletList": [
            {
                "tokenProtocol": 1,
                "tokenSymbol": "ETH",
                "qrcode": "iban:XE54DQFJCPH89TMVU1O6BJCH7KJX9CRCGDD",
                "addr": "0x7593817f4815aeb2d473468d5e93e56d9aad58e1",
                "addrTag": "",
                "hasTag": 0,
                "mobile": "18514429019"
            },
            {
                "tokenProtocol": 2,
                "tokenSymbol": "BTC",
                "qrcode": "",
                "addr": "",
                "addrTag": "",
                "hasTag": 0,
                "mobile": "18514429019"
            },
        ]
    }
}
```
**返回参数说明** 

|参数名|类型|说明|
|:-----|:---|----|

**备注** 

### 获取用户钱包地址
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/getWalletData `

**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:-----|:---|:---|----|
|tokenProtocol|是|int|通证类别|
|appKey|是|string|第三方应用唯一标识|
|token|是|string|用户唯一标识|
|sign|是|string|客户端签名|

**返回示例**
```JSON
{
    "errcode": 0,
    "errmsg": "成功执行",
    "data": {
        "tokenProtocol": "1",
        "tokenSymbol": "ETH",
        "qrcode": "iban:XE54DQFJCPH89TMVU1O6BJCH7KJX9CRCGDD",
        "addr": "0x7593817f4815aeb2d473468d5e93e56d9aad58e1",
        "addrTag": ""
    }
}
```
**返回参数说明** 

|参数名|类型|说明|
|:-----|:---|----|

**备注** 

### 获取用户特定币种的钱包地址
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/getTokenWallet `

**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:-----|:---|:---|----|
|tokenId|是|int|通证ID|
|appKey|是|string|第三方应用唯一标识|
|token|是|string|用户唯一标识|
|sign|是|string|客户端签名|

**返回示例**
```JSON
{
    "errcode": 0,
    "errmsg": "成功执行",
    "data": {
        "mobile": "18514429019",
        "tokenSymbol": "BCV",
        "qrcode": "iban:XE54DQFJCPH89TMVU1O6BJCH7KJX9CRCGDD",
        "addr": "0x7593817f4815aeb2d473468d5e93e56d9aad58e1",
        "addrTag": "",
        "hasTag": 0
    }
}
```
**返回参数说明** 

|参数名|类型|说明|
|:-----|:---|----|

**备注** 

### 扫一扫解析地址信息
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/parseAddr `

**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:-----|:---|:---|----|
|input|是|string|二维码扫描结果|
|appKey|是|string|第三方应用唯一标识|
|token|是|string|用户唯一标识|
|sign|是|string|客户端签名|

**返回示例**
```JSON
{
    "errcode": 0,
    "errmsg": "成功执行",
    "data": {
        "addr": "0x7593817f4815aeb2d473468d5e93e56d9aad58e1",
        "addrTag": "",
        "hasTag": 0,
        "forceTag": 0,
        "protocol": 1,
        "protocolArr": "[1]",
        "inPlat": 1,
        "amount": "0.0000",
        "amountStr": "0.0000",
        "tokenData": null
    }
}
```
**返回参数说明** 

|参数名|类型|说明|
|:-----|:---|----|

**备注** 

### 校验地址格式
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/checkAddr `

**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:-----|:---|:---|----|
|addr|是|string|转账地址|
|appKey|是|string|第三方应用唯一标识|
|token|是|string|用户唯一标识|
|sign|是|string|客户端签名|

**返回示例**
```JSON
{
    "errcode": 0,
    "errmsg": "成功执行",
    "data": {
        "addr": "0x7593817f4815aeb2d473468d5e93e56d9aad58e1",
        "addrTag": "",
        "protocol": 1,
        "protocolArr": "[1]",
        "hasTag": 0,
        "forceTag": 0,
        "inPlat": 1,
        "amount": "0.0000",
        "amountStr": "0.0000",
        "tokenData": null
    }
}
```
**返回参数说明** 

|参数名|类型|说明|
|:-----|:---|----|

**备注** 

### 获取转账币种列表
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/getTranTokenList `

**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:-----|:---|:---|----|
|appKey|是|string|第三方应用唯一标识|
|token|是|string|用户唯一标识|
|sign|是|string|客户端签名|

**返回示例**
```JSON
{
    "errcode": 0,
    "errmsg": "成功执行",
    "data": {
        "tokenList": [
            {
                "token_id": 4,
                "token_symbol": "BCV",
                "value": "0.00",
                "valueStr": "0.00",
                "priceCNY": "0.10",
                "priceStr": "0.10",
                "logo_url": "https://static.ucai.net/storage/image/logo/RRhDcW5lrxgNpzpsBxSRF5qxZ6vTAG07bA3Chdge.png",
                "price": "0.10",
                "amount": "0.0000",
                "amountStr": "0.0000"
            },
        ]
    }
}
```
**返回参数说明** 

|参数名|类型|说明|
|:-----|:---|----|

**备注** 

### 获取转账服务费信息
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/getFeeList `

**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:-----|:---|:---|----|
|tokenId|是|int|通证ID|
|toAddr|是|string|转账地址|
|appKey|是|string|第三方应用唯一标识|
|token|是|string|用户唯一标识|
|sign|是|string|客户端签名|

**返回示例**
```JSON
{
    "errcode": 0,
    "errmsg": "成功执行",
    "data": {
        "tokenProtocol": 1,
        "feeTokenId": 156,
        "feeSymbol": "ETH",
        "feeTokenAmount": "0.0000",
        "feeTokenAmountStr": "0.0000",
        "feeAmount": "0.0005",
        "feeAmountStr": "0.0005",
        "defaultLevel": 1,
        "isFree": 0,
        "freeStr": "",
        "userData": {
            "hasPaywd": 0,
            "hasGacode": 0,
            "forceGacode": 0
        },
        "remainAmount": "9097.7591",
        "maxAmountStr": "￥1000",
        "feeDesc": [
            "服务费以近期交易均值估算",
            "按照当前交易状态动态调整",
            "主网交易越拥堵，服务费越高（以保证转账顺利完成）"
        ],
        "hasTag": 0,
        "inPlat": 0,
        "forceTag": 0,
        "tagIsOk": 1
    }
}
```
**返回参数说明** 

|参数名|类型|说明|
|:-----|:---|----|

**备注** 

### 转账
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/tranToken `

**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:-----|:---|:---|----|
|tokenId|是|int|通证ID|
|toAddr|是|string|转账地址|
|feeAmount|是|float|转账手续费数量|
|amount|是|float|转账数量|
|paywd|是|int|支付密码|
|gaCode|否|int|谷歌验证码|
|appKey|是|string|第三方应用唯一标识|
|token|是|string|用户唯一标识|
|sign|是|string|客户端签名|

**返回示例**
```JSON
{
    "errcode": 0,
    "errmsg": "成功执行",
    "data": {
        "financeId": 4,
    }
}
```
**返回参数说明** 

|参数名|类型|说明|
|:-----|:---|----|

**备注** 

### 发送验证码
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/sendVcode `

**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:-----|:---|:---|----|
|appKey|是|string|第三方应用唯一标识|
|token|是|string|用户唯一标识|
|sign|是|string|客户端签名|

**返回示例**
```JSON
{
    "errcode": 0,
    "errmsg": "成功执行",
}
```
**返回参数说明** 

|参数名|类型|说明|
|:-----|:---|----|

**备注** 

### 验证支付密码
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/checkPaywd `

**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:-----|:---|:---|----|
|paywd|是|int|支付密码|
|appKey|是|string|第三方应用唯一标识|
|token|是|string|用户唯一标识|
|sign|是|string|客户端签名|

**返回示例**
```JSON
{
    "errcode": 0,
    "errmsg": "成功执行",
}
```
**返回参数说明** 

|参数名|类型|说明|
|:-----|:---|----|

**备注** 

### 设置支付密码
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/setPaywd `

**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:-----|:---|:---|----|
|paywd|是|int|支付密码|
|vcode|是|int|验证码|
|appKey|是|string|第三方应用唯一标识|
|token|是|string|用户唯一标识|
|sign|是|string|客户端签名|

**返回示例**
```JSON
{
    "errcode": 0,
    "errmsg": "成功执行",
}
```
**返回参数说明** 

|参数名|类型|说明|
|:-----|:---|----|

**备注** 

### 验证谷歌验证码
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/verifyGacode `

**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:-----|:---|:---|----|
|gaSecret|是|string|谷歌验证码密钥|
|gaCode|是|int|谷歌验证码|
|appKey|是|string|第三方应用唯一标识|
|token|是|string|用户唯一标识|
|sign|是|string|客户端签名|

**返回示例**
```JSON
{
    "errcode": 0,
    "errmsg": "成功执行",
}
```
**返回参数说明** 

|参数名|类型|说明|
|:-----|:---|----|

**备注** 

### 获取谷歌验证码私钥
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/getGaSecret `

**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:-----|:---|:---|----|
|appKey|是|string|第三方应用唯一标识|
|token|是|string|用户唯一标识|
|sign|是|string|客户端签名|

**返回示例**
```JSON
{
    "errcode": 0,
    "errmsg": "成功执行",
    "data": {
        "gaSecret": "AdgEdbadgegDHdgK",
        "gaQrcode": "BdgaAdgCdgssaAV",
    }
}
```
**返回参数说明** 

|参数名|类型|说明|
|:-----|:---|----|

**备注** 

### 设置谷歌验证码私钥
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/addGaSecret `

**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:-----|:---|:---|----|
|gaSecret|是|string|谷歌验证码私钥|
|payVcode|是|int|短信验证码|
|appKey|是|string|第三方应用唯一标识|
|token|是|string|用户唯一标识|
|sign|是|string|客户端签名|

**返回示例**
```JSON
{
    "errcode": 0,
    "errmsg": "成功执行",
}
```
**返回参数说明** 

|参数名|类型|说明|
|:-----|:---|----|

**备注** 

### 获取转账记录列表
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/getFinanceList `

**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:-----|:---|:---|----|
|tokenId|否|int|通证ID，不传则获取所有通证的交易信息|
|perpage|是|int|每页返回数据数量|
|pageno|是|int|页码，从1开始|
|appKey|是|string|第三方应用唯一标识|
|token|是|string|用户唯一标识|
|sign|是|string|客户端签名|

**返回示例**
```JSON
{
    "errcode": 0,
    "errmsg": "成功执行",
    "data": {
        "dataCount": 0,
        "financeList": [
            {
                "id": 5343093,
                "status": 2,
                "type": 15,
                "iconUrl": "https://www.bitcv.com/app_static/icon/finance_in_cn.png",
                "title": "菠菜庄园",
                "amount": "11.8200",
                "amountStr": "+11.8200",
                "tokenSymbol": "BCV",
                "timeStr": "31分钟前",
                "statusStr": "收取成功",
                "processStr": ""
            },
        ]
    }
}
```
**返回参数说明** 

|参数名|类型|说明|
|:-----|:---|----|

**备注** 

### 获取转账记录详情
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/getFinanceDetail `

**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:-----|:---|:---|----|
|financeId|是|int|交易ID|
|appKey|是|string|第三方应用唯一标识|
|token|是|string|用户唯一标识|
|sign|是|string|客户端签名|

**返回示例**
```JSON
{
    "errcode": 0,
    "errmsg": "成功执行",
    "data": {
        "hasTag": 0,
        "showTran": 0,
        "addrTag": "",
        "statusStr": "收取成功 ",
        "status": 2,
        "percentStr": "",
        "amount": "11.8200",
        "amountStr": "+11.8200",
        "tokenSymbol": "BCV",
        "tokenData": {
            "logoUrl": "https://static.ucai.net/storage/image/logo/RRhDcW5lrxgNpzpsBxSRF5qxZ6vTAG07bA3Chdge.png",
            "amount": "8602.1335",
            "amountStr": "8,602.1335",
            "price": "0.02",
            "priceCNY": "0.02",
            "priceStr": "0.02",
            "value": "220.90",
            "valueStr": "220.90",
            "tokenId": 4,
            "tokenSymbol": "BCV"
        },
        "hasProcess": 0,
        "detail": [
            [
                {
                    "label": "交易类型",
                    "text": "收入",
                    "canCopy": 0
                }
            ],
            [
                {
                    "label": "完成时间",
                    "text": "2018-11-21 10:19:52",
                    "canCopy": 0
                },
                {
                    "label": "备注",
                    "text": "菠菜庄园",
                    "canCopy": 0
                }
            ]
        ]
    }
}
```
**返回参数说明** 

|参数名|类型|说明|
|:-----|:---|----|

**备注** 

### 获取常用地址列表
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/getTranAddrList `

**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:-----|:---|:---|----|
|appKey|是|string|第三方应用唯一标识|
|token|是|string|用户唯一标识|
|sign|是|string|客户端签名|

**返回示例**
```JSON
{
    "errcode": 0,
    "errmsg": "成功执行",
    "data": {
        "dataList": [
            {
                "symbol": "ETH",
                "addrList": [
                    {
                        "addrId": 7,
                        "tag": "主钱包",
                        "addr": "0x366199b0377ba868bb7333de09a4ddeb671c74a4"
                    },
                    {
                        "addrId": 497,
                        "tag": "哈喽",
                        "addr": "0x449da27d3b94ca18cb20cc76a477b71077257b54"
                    }
                ]
            },
            {
                "symbol": "BTC",
                "addrList": []
            },
        ]
    }
}
```

**返回参数说明** 

|参数名|类型|说明|
|:-----|:---|----|

**备注** 

### 获取常用地址
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/getTranAddr `

**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:-----|:---|:---|----|
|tokenId|是|int|通证ID|
|appKey|是|string|第三方应用唯一标识|
|token|是|string|用户唯一标识|
|sign|是|string|客户端签名|

**返回示例**
```JSON
{
    "errcode": 0,
    "errmsg": "成功执行",
    "data": {
        "dataCount": 2,
        "addrList": [
            {
                "addrId": 7,
                "tag": "主钱包",
                "addr": "0x366199b0377ba868bb7333de09a4ddeb671c74a4",
                "addrTag": "",
                "tokenId": 4,
                "tokenSymbol": "BCV",
                "hasTag": 0,
                "protocolArr": "[1]"
            },
            {
                "addrId": 497,
                "tag": "哈喽",
                "addr": "0x449da27d3b94ca18cb20cc76a477b71077257b54",
                "addrTag": "",
                "tokenId": 4,
                "tokenSymbol": "BCV",
                "hasTag": 0,
                "protocolArr": "[1]"
            }
        ]
    }
}
```
**返回参数说明** 

|参数名|类型|说明|
|:-----|:---|----|

**备注** 

### 添加常用地址
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/addTranAddr `

**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:-----|:---|:---|----|
|tokenId|是|int|通证ID|
|addr|是|string|钱包地址|
|tag|是|string|备注|
|addrTag|是|string|地址标签|
|appKey|是|string|第三方应用唯一标识|
|token|是|string|用户唯一标识|
|sign|是|string|客户端签名|

**返回示例**
```JSON
{
    "errcode": 0,
    "errmsg": "成功执行",
}
```

**备注** 

### 修改常用地址
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/updTranAddr `

**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:-----|:---|:---|----|
|addrId|是|int|地址ID|
|addr|是|string|钱包地址|
|tag|是|string|备注|
|addrTag|是|string|地址标签|
|appKey|是|string|第三方应用唯一标识|
|token|是|string|用户唯一标识|
|sign|是|string|客户端签名|

**返回示例**
```JSON
{
    "errcode": 0,
    "errmsg": "成功执行",
}
```

**备注** 

### 删除常用地址
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/delTranAddr `

**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:-----|:---|:---|----|
|addrId|是|int|地址ID|
|appKey|是|string|第三方应用唯一标识|
|token|是|string|用户唯一标识|
|sign|是|string|客户端签名|

**返回示例**
```JSON
{
    "errcode": 0,
    "errmsg": "成功执行",
}
```

**备注** 
