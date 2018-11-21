# 目录
- [服务端接口](#服务端接口)
  - [注册登录](#注册登录)
- [客户端接口](#客户端接口)
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
|token|是|string|应用授权接口调用凭证|
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
|token|string|客户端调用接口必须凭证|

**备注** 
- 如果未注册，则直接注册

## 客户端接口
### 获取用户资产
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/getUserAsset `

### 获取用户资产列表
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/getUserAssetList `

### 获取币种列表
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/getTokenList `

### 搜索币种列表
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/searchTokenList `

### 添加用户资产
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/addUserAsset `

### 隐藏用户资产
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/hideUserAsset `

### 获取用户钱包地址列表
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/getWalletList `

### 获取用户钱包地址
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/getWalletData `

### 获取用户特定币种的钱包地址
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/getTokenWallet `

### 扫一扫解析地址信息
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/parseAddr `

### 校验地址格式
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/checkAddr `

### 获取转账币种列表
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/getTranTokenList `

### 获取转账服务费信息
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/getFeeList `

### 转账
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/tranToken `

### 发送验证码
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/sendVcode `

### 验证支付密码
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/checkPaywd `

### 设置支付密码
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/setPaywd `

### 验证谷歌验证码
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/verifyGacode `

### 获取谷歌验证码私钥
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/getGaSecret `

### 设置谷歌验证码私钥
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/addGaSecret `

### 获取转账记录列表
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/getFinanceList `

### 获取转账记录详情
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/getFinanceDetail `

### 获取常用地址列表
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/getTranAddrList `

### 获取常用地址
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/getTranAddr `

### 添加常用地址
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/addTranAddr `

### 修改常用地址
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/updTranAddr `

### 删除常用地址
**请求URL：** 
- ` https://www.bitcv.com/api/sdk/delTranAddr `
