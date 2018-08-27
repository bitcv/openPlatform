## 使用币威  JS-SDK
通过使用币威 JS-SDK，网页开发者可借助币威APP使用登录、支付等能力，未来还将开放更多如分享、扫一扫等功能。
#### 使用流程
1. 绑定域名
如接入指南中介绍，先联系币威团队确定 “JS接口安全域名”。

2. 引入 JS-SDK 文件
在需要调用JS接口的页面引入JSSDK文件。

3. 通过 config 接口注入权限验证配置
所有需要使用 JS-SDK 的页面必须先注入配置信息，否则将无法调用（同一个url仅需调用一次）
```javascript
bcvWallet.config({
    debug: false, // 开启调试模式时会在网页头部生成一系列log记录
    appId: '', // 必填，第三方的唯一标识
    timestamp: , // 必填，生成签名的时间戳
    nonceStr: '', // 必填，生成签名的随机串
    signature: '',// 必填，签名
    jsApiList: [] // 非必填，目前可传入空数组，后续会加入权限判断校验
});
```
签名算法见后续签名算法章节

4. 通过ready接口处理成功验证
```javascript
bcvWallet.ready(function(){
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
});
```

5. 通过error接口处理失败验证
```javascript
bcvWallet.error(function(res){
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息在返回的res参数中查看。
});
```

#### 接口调用说明
所有接口通过 bcvWallet 对象来调用，参数是一个对象，除了每个接口本身需要传的参数之外，还有以下通用参数：
1. success：接口调用成功时执行的回调函数。
2. fail：接口调用失败时执行的回调函数。
3. complete：接口调用完成时执行的回调函数，无论成功或失败都会执行。
4. cancel：用户点击取消时的回调函数，仅部分有用户取消操作的api才会用到。

以上几个函数都带有一个参数，类型为对象，有三个通用属性 errcode、errmsg、data，其值格式如下：
- 调用成功时：errcode: 0, errmsg: 'success', data为具体接口返回的数据
- 用户取消时：errcode: -1, errmsg: 'cancel' （如有具体取消原因，如安卓没有弹窗权限导致调用不起支付，会返回如下格式 cancel: permissions compatibility）, data 为空
- 调用失败时：errcode: 1或具体状态码（为大于等于1的正整数）, errmsg: 其值为具体错误信息, data 为空


#### 调用币威支付接口
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
币威支付[开发文档]()