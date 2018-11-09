## 使用币威  JS-SDK
通过使用币威 JS-SDK，网页开发者可借助币威APP使用支付、分享等能力，未来还将开放更多如扫一扫、获取地理位置、图像、音视频等功能。

此文档面向网页开发者介绍币威 JS-SDK 如何使用及相关注意事项。

### 使用流程
1. 开通开发权限，绑定域名
  如开放平台首页接入流程中介绍，先联系币威团队开通开发权限，并配置 “JS接口安全域名”，开发者只能在其对应 JS 接口安全域名的网页中使用 JS-SDK 的相关功能。

2. 下载并引入 JS-SDK 文件
  可使用 `npm` 安装，或直接在 Github 上下载 `dist/bcvwallet.min.js` 到自己项目中

  ```
  npm install bcvwallet
  ```

  在需要调用JS接口的页面中引入 JS-SDK 文件，引入方法如下：

  - 如果使用了 AMD/CMD 规范，可在 module 内使用 require() 引入模块：
  ``` javascript
  var bcvWallet = require('bcvwallet');
  ```
  - 直接引用，引入后会在全局注册一个`bcvWallet`对象： 
  ``` javascript
  <script type="text/javascript" src="path/to/bcvwallet.min.js"></script>
  ```

3. 通过 config 接口注入权限验证配置
  所有需要使用 JS-SDK 的页面必须先注入配置信息，否则将无法调用
  
  注意：同一个 url 仅需调用一次，对于变化 url 的 SPA 应用也同样仅需调用一次即可。目前 Android 客户端中如果重复调用会抛出异常。


```javascript
bcvWallet.config({
  debug: false, // 开启调试模式时会在网页底部生成一系列log记录
  appId: '', // 必填，第三方的唯一标识
  timestamp: , // 必填，生成签名的时间戳
  nonceStr: '', // 必填，生成签名的随机串
  signature: '',// 必填，签名
  jsApiList: [] // 非必填，目前可传入空数组，后续会加入权限判断校验
});
```
[签名算法](../README.md)见币威开放平台首页中后端签名机制

4. 通过ready接口处理成功验证
```javascript
bcvWallet.ready(function(){
  // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
});
```

5. 通过error接口处理失败验证
```javascript
bcvWallet.error(function(res){
  // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息在返回的res参数中查看，具体参数格式见下文-接口调用说明。
});
```


### 接口调用说明

所有接口通过 bcvWallet 对象来调用，参数是一个对象，除了每个接口本身需要传的参数之外，还有以下通用参数：
1. success：接口调用成功时执行的回调函数。
2. fail：接口调用失败时执行的回调函数。
3. complete：接口调用完成时执行的回调函数，无论成功或失败都会执行。
4. cancel：用户点击取消时的回调函数，仅部分有用户取消操作的api才会用到。

以上几个函数都带有一个参数，类型为对象，有三个通用属性 errcode、errmsg、data，其值格式如下：
- 调用成功时：errcode: 0, errmsg: 'success', data为具体接口返回的数据
- 用户取消时：errcode: -1, errmsg: 'cancel', data 为空（如有具体取消原因，会在 'cancel' 后面加具体取消信息。如安卓没有弹窗权限导致调用不起支付，会返回如下格式 cancel: permissions compatibility）
- 调用失败时：errcode: 1或具体状态码（为大于等于1的正整数）, errmsg: 其值为具体错误信息, data 为空


### 币威支付接口 requestPayment
可以通过币威支付接口调起 币威APP 的客户端支付功能，用户输入密码，即可完成支付操作。目前支持多种 Token 做为支付币种。
```javascript
bcvWallet.requestPayment({
  accessToken: '', // 必填，应用授权接口调用凭证
  tradeNo: '', // 必填，开放平台订唯一单号
  requestTime: '', // 请求时间
  success: function (res) {
    // 支付成功后的回调函数
  }
});
```
其中支付相关的凭证、单号信息等需要通过后端调用币威开放平台生成，具体详见：币威支付[开发文档](../doc/pay.md)

### 分享接口 shareWechat
集成了分享到微信聊天，微信朋友圈，复制分享内容的功能，目前分享有如下两种形式，通过 type 字段控制：
1. link：网页链接形式，分享时包含分享到微信聊天，微信朋友圈和复制按钮，用户可以选择复制分享的内容
2. screenshot：截图分享，APP 将截取整个当前网页为图片进行分享，分享时包含分享到微信聊天，微信朋友圈和下载按钮，用户可以选择将图片下载下来

分享 link 的示例如下：
```javascript
bcvWallet.shareWechat({
  type: 'link',
  title: '', // 非必填，分享标题（如果没有，自动调用网页title）
  thumb: '', // 非必填，分享缩略图
  desc: '', // 非必填，分享描述
  url: '', // 非必填，分享链接（如果没有，默认使用当前网页链接）
  textCopy: '', // 非必填，可以复制的文案，用户可以点击按钮复制该文案
  success: function (res) {
    // 分享成功（包括复制成功）后的回调函数
  }
});
```
分享 screenshot 的示例如下：
```javascript
bcvWallet.shareWechat({
  type: 'screenshot',
  success: function (res) {
    // 分享成功（包括下载成功）后的回调函数
  }
});
```

**备注**
- 调用 config 进行配置是一个客户端的异步操作，时间长短会受到网络环境的影响，如果 config 接口还未返回ready 或 error 回调就调用其他接口，该接口会调用失败，在 Android 手机上可能会导致整个配置过程失效，因此建议开发者设置一个变量管理 config 配置的状态，在 config 调用成功之前，不允许用户直接触发其他接口的调用。（此问题将在下一个版本更新中修复）
- 分享接口：上文介绍的分享接口功能为币威钱包简体中文版本功能，在币威钱包海外版本（繁体版、英文版）中，会根据当地用户的使用习惯替换为分享到 Line、分享到 Facebook 等功能，但是SDK 调用的方法及参数不变。

*未来还将开放更多功能，敬请期待*