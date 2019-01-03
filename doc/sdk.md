# 目录

- [服务器端接口](./doc/server.md)

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
  - [发送短信验证码](#发送短信验证码)
  - [发送语音验证码](#发送语音验证码)
  - [校验验证码](#校验验证码)
  - [设置支付密码](#设置支付密码)
  - [验证谷歌验证码](#验证谷歌验证码)
  - [获取谷歌验证码私钥](#获取谷歌验证码私钥)
  - [设置谷歌验证码](#设置谷歌验证码)
  - [获取转账记录列表](#获取转账记录列表)
  - [获取转账记录详情](#获取转账记录详情)
  - [获取常用地址通证列表](#获取常用地址通证列表)
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
    "data": {},
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
|tokenId|int|通证ID|
|tokenSymbol|string|通证符号|
|hasTag|int|是否输入标签：0不需要，1需要|
|logoUrl|string|通证logo链接|
|price|float|通证单价|
|priceStr|string|通证单价（带千位分隔符）|
|amount|float|通证数量|
|amountStr|string|通证数量（带千位分隔符）|
|value|float|通证价值|
|valueStr|string|通证价值（带千位分隔符）|

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
                "tokenSymbol": "BCV",
                "tokenProtocol": 1,
                "hasTag": 0,
                "logoUrl": "https://static.ucai.net/storage/image/logo/RRhDcW5lrxgNpzpsBxSRF5qxZ6vTAG07bA3Chdge.png",
                "amount": "0.0000",
                "amountStr": "0.0000",
                "order": 10001,
                "price": "0.109",
                "priceStr": "0.109",
                "value": "0.000",
                "valueStr": "0.000",
            },
        ]
    }
}
```
**返回参数说明** 

|参数名|类型|说明|
|:-----|:---|----|
|totalValue|float|资产总价值（用于客户端计算）|
|totalValueStr|string|资产总价值（带千分位分隔符，用于显示）|
|tokenId|int|通证ID|
|tokenSymbol|string|通证符号|
|tokenProtocol|int|通证类别|
|hasTag|int|是否输入标签：0不需要，1需要|
|logoUrl|string|通证logo链接|
|price|float|通证单价|
|priceStr|string|通证单价（带千位分隔符）|
|amount|float|通证数量|
|amountStr|string|通证数量（带千位分隔符）|
|value|float|通证价值|
|valueStr|string|通证价值（带千位分隔符）|

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
|tokenList|array|通证列表|
|id|int|通证ID|
|name|string|通证名称|
|symbol|string|通证符号|
|logoUrl|string|通证logo链接|
|protocol|int|通证类别|
|isShow|int|是否展示|
|hasTag|int|是否有memo|

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
|tokenList|array|通证列表|
|id|int|通证ID|
|name|string|通证名称|
|symbol|string|通证符号|
|logoUrl|string|通证logo链接|
|protocol|int|通证类别|
|isShow|int|是否展示|
|hasTag|int|是否有memo|

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
    "data": {},
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
    "data": {},
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
        ]
    }
}
```
**返回参数说明** 

|参数名|类型|说明|
|:-----|:---|----|
|tokenProtocol|int|通证类别|
|tokenSymbol|string|通证符号|
|qrcode|string|二维码字符串|
|addr|string|钱包地址|
|addrTag|string|地址标签|
|hasTag|int|是否有标签|
|mobile|string|用户手机号|

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
|tokenProtocol|int|通证类别|
|tokenSymbol|string|通证符号|
|qrcode|string|二维码字符串|
|addr|string|钱包地址|
|addrTag|string|地址标签|

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
        "tokenSymbol": "BCV",
        "qrcode": "iban:XE54DQFJCPH89TMVU1O6BJCH7KJX9CRCGDD",
        "addr": "0x7593817f4815aeb2d473468d5e93e56d9aad58e1",
        "addrTag": "",
        "hasTag": 0,
        "mobile": "18514429019",
    }
}
```
**返回参数说明** 

|参数名|类型|说明|
|:-----|:---|----|
|tokenSymbol|string|通证符号|
|qrcode|string|二维码字符串|
|addr|string|钱包地址|
|addrTag|string|地址标签|
|hasTag|int|是否有标签|
|mobile|string|用户手机号|

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
|addr|string|钱包地址|
|addrTag|string|地址标签|
|hasTag|int|是否需要地址标签：0不需要，1需要|
|forceTag|int|是否必须输入地址标签: 0不是，1是|
|protocol|string|通证类型|
|protocolArr|json|地址支持的通证类型json|
|inPlat|string|是否平台内转账：0不是，1是|
|amount|float|转账数量|
|amountStr|string|转账数量（带千分位分隔符）|
|tokenData|dict|通证信息

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
|addr|string|钱包地址|
|addrTag|string|地址标签|
|hasTag|int|是否需要地址标签：0不需要，1需要|
|forceTag|int|是否必须输入地址标签: 0不是，1是|
|protocol|string|通证类型|
|protocolArr|json|地址支持的通证类型json|
|inPlat|string|是否平台内转账：0不是，1是|
|amount|float|转账数量|
|amountStr|string|转账数量（带千分位分隔符）|
|tokenData|dict|通证信息

**备注** 

### 获取转账币种列表
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/getTranTokenList `

**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:-----|:---|:---|----|
|protocolArr|否|string|按币种过滤|
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
                "tokenId": 4,
                "tokenSymbol": "BCV",
                "logoUrl": "https://static.ucai.net/storage/image/logo/RRhDcW5lrxgNpzpsBxSRF5qxZ6vTAG07bA3Chdge.png",
                "amount": "0.0000",
                "amountStr": "0.0000",
                "price": "0.10",
                "priceStr": "0.10",
                "value": "0.00",
                "valueStr": "0.00",
            },
        ]
    }
}
```
**返回参数说明** 

|参数名|类型|说明|
|:-----|:---|----|
|tokenId|int|通证ID|
|tokenSymbol|string|通证符号|
|logoUrl|string|通证logo链接|
|amount|float|通证数量|
|amountStr|string|通证数量（带千分位分隔符）|
|price|float|通证单价|
|priceStr|string|通证单价（带千分位分隔符）|
|value|float|通证价值|
|valueStr|string|通证价值（带千分位分隔符）|

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
|tokenProtocol|int|通证类别|
|feeTokenId|int|服务费通着ID|
|feeSymbol|string|服务费符号|
|feeAmount|float|所需手续费数量|
|feeAmountStr|string|所需手续费数量（带千位分隔符）|
|feeTokenAmount|float|用户持有手续费token的剩余数量|
|feeTokenAmountStr|string|用户持有手续费token的剩余数量（带千位分隔符）|
|isFree|int|是否免服务费|
|userData|dict|当前用户信息|
|hasPaywd|int|是否设置了支付密码|
|hasGacode|int|是否设置了谷歌验证码|
|forceGacode|int|是否必须输入谷歌验证码|
|remainAmount|float|谷歌验证码限制数量|
|maxAmountStr|string|每日免谷歌验证码转账限额|
|feeDesc|array|服务费说明|
|hasTag|int|是否有地址标签|
|inPlat|int|是否平台内转账|
|forceTag|int|是否必须输入地址标签|
|tagIsOk|int|地址标签是否正确|

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
|addrTag|否|string|地址memo，EOS系内部转账必填|
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
|financeId|int|交易明细ID|

**备注** 

### 发送短信验证码
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/getPayVcode `

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
    "data": {},
}
```
**备注** 

### 发送语音验证码
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/getPayAudioVcode `

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
    "data": {},
}
```
**备注** 

### 校验语音验证码
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/checkPayVcode `

**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:-----|:---|:---|----|
|vcode|required|int|4位数字验证码|
|appKey|是|string|第三方应用唯一标识|
|token|是|string|用户唯一标识|
|sign|是|string|客户端签名|

**返回示例**
```JSON
{
    "errcode": 0,
    "errmsg": "成功执行",
    "data": {},
}
```
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
    "data": {},
}
```

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
    "data": {},
}
```

**备注** 

### 验证谷歌验证码
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/verifyGaCode `

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
    "data": {},
}
```

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
|gaSecret|string|谷歌验证码密钥|
|gaQrcode|string|谷歌验证码密钥二维码|

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
    "data": {},
}
```

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
|dataCount|int|数据总条数|
|financeList|array|交易列表|
|id|int|交易ID|
|status|int|交易状态：1进行中，2已完成|
|type|int|交易类型|
|iconUrl|string|交易图标Url|
|title|string|交易标题|
|amount|float|交易数量|
|amountStr|string|交易数量字符串|
|tokenSymbol|string|通证符号|
|timeStr|string|交易时间字符串|
|statusStr|string|交易状态描述|

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

### 获取常用地址通证列表
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/getAddrTokenList `

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
                "tokenId": 156,
                "tokenSymbol": "ETH",
                "logoUrl": "https://static.ucai.net/storage/image/logo/45qNTzhGcv3OmplitL47hyl4jqAlGXM1GKVkMpgd.png",
                "hasTag": 0
            },
            {
                "tokenId": 160,
                "tokenSymbol": "BTC",
                "logoUrl": "https://file.ucai.net/logo_uge9TyZZwPeGZwM",
                "hasTag": 0
            },
        ]
    }
}
```

**返回参数说明** 

|参数名|类型|说明|
|:-----|:---|----|
|tokenList|array|通证列表|
|tokenId|int|通证ID|
|tokenSymbol|string|通证符号|
|logoUrl|string|通证logo|
|hasTag|string|是否有地址标签|

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
|symbol|string|通证符号|
|addrList|array|地址列表|
|addrId|int|地址ID|
|tag|string|地址备注|
|addr|string|地址|

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
        ]
    }
}
```
**返回参数说明** 

|参数名|类型|说明|
|:-----|:---|----|
|addrList|array|地址列表|
|addrId|int|地址ID|
|tag|string|地址备注|
|addr|string|地址|
|addrTag|string|地址标签|
|tokenId|string|地址支持的通证ID|
|tokenSymbol|string|通证符号|
|hasTag|int|是否有标签|
|protocolArr|json|支持的币种类型json|

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
    "data": {},
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
    "data": {},
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
    "data": {},
}
```