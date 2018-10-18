﻿## 币威APP-SDK集成文档
通过嵌入币威 APP-SDK，项目方App无需开发任何和区块链相关的代码，便拥有了钱包的收款、转账、查询交易记录等所有基本功能。

### 用户使用流程
1. 在项目方APP的某处放置链接到钱包按钮，用户点击后就跳转到钱包SDK的相关界面，查看和管理自己的资产。
2. 用户第一次点击钱包，会提示授权并短信验证，同意后再次进入钱包不需要再验证。
3. 用户在项目方APP退出账号时，需要调用SDK的退出接口，切换账号后短信验证新账号登录。

### 接入流程
1. 申请币威企业账号  
  普通币威钱包账号就行，建议该手机号作为公有，和个人资产分开。  
  用户向企业、企业向用户的转账都是用该企业账号。
2. 申请APPKEY和SECRETKEY  
  提供企业账号、项目方币种信息后，我们将开通APPKEY和SECRETKEY
3. 下载Android或iOS版本的APP-SDK，嵌入到企业App中  
  如果只需要给用户提供简单转账，则不需要任何其他对接开发。
4. 如果需要给用户转币或支持，可以完成服务器API的对接

### API使用场景
通过api可以完成企业账户与用户之间的资产划转等交互使用，例如：
1. 用户初次打开SDK便能看到App的资产  
对企业账号充值资产  
转移企业账号资产到用户手机号  
用户接入SDK就能看到自己的资产了
2. App积分转换为用户资产  
扣除用户积分  
转移企业账户资产到用户  
用户能实时看到自己资产的变化和交易记录
3. 扣除用户资产  
通过接口查询用户资产  
发起订单  
用户支付  
企业账户相应的增加了资产

### iOS、Android接口
1. [iOS-SDK 使用文档](./iOS-SDK.md)
2. [Android-SDK 使用文档](https://github.com/bitcv/Android-BitcvWalletSDK)
