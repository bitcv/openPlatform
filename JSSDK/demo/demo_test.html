<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>JSSDK-demo</title>

  <style>
    * {
      margin:0;
      padding:0;
    }
    body {
      padding-top: 60px;
      padding-bottom: 60px;
    }
    .header {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      height: 60px;
      font-size: 12px;
      text-align: center;
      color: #fff;
      line-height: 60px;
      background-color: #6093EC;
    }
    .ctn {
      padding: 4px 15px 0;
    }
    .ctn img {
      width: 100%;
      margin-top: 12px;
      box-shadow: 0 0 10px rgba(0,0,0,.1);
    }
    .footer {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
    }
    .footer a {
      flex: 1;
      height: 50px;
      text-decoration: none;
      text-align: center;
      font-size: 12px;
      line-height: 50px;
    }
    .share {
      background-color: #F6F6F6;
      color: #333;
    }
    .buy {
      background-color: #6093EC;
      color: #fff;
    }
    button {
      font-size: 20px;
    }
  </style>
</head>
<body>
  <h1 class="header">PRODUCT</h1>
  <section class="ctn">
    <img src="./assets/img1.jpg" alt="">
    <img src="./assets/img2.jpg" alt="">
    <div><a class="share" href="javascript:;" onclick="testOpenUrlScheme('alipays://platformapi/startapp?saId=10000007&qrcode=HTTPS%3A%2F%2FQR.ALIPAY.COM%2FFKX045642YJ71YSZYNX005', 'outside')">SDK跳转支付宝</a></div>
    <div><a class="share" href="javascript:;" onclick="testOpenUrlScheme('weixin://', 'outside')">SDK跳转微信</a></div>
    <div><a class="share" href="javascript:;" onclick="testOpenUrl('weixin://')">直接跳转微信</a></div>
    <div><a class="share" href="javascript:;" onclick="testOpenUrl('alipays://platformapi/startapp?saId=10000007&qrcode=HTTPS%3A%2F%2FQR.ALIPAY.COM%2FFKX045642YJ71YSZYNX005')">直接跳转支付宝转账</a></div>
    <div><a class="share" href="javascript:;" onclick="testOpenUrlScheme('bw://trantoken', 'inside')">转账</a></div>
    <div><a class="share" href="javascript:;" onclick="testOpenUrlScheme('bw://userwalletlist', 'inside')">收款</a></div>
    <div><a class="share" href="javascript:;" onclick="testOpenUrlScheme('bw://depo', 'inside')">余币宝</a></div>
    <div><a class="share" href="javascript:;" onclick="testOpenUrlScheme('bw://depoBuy?depoId=23', 'inside')">余币宝购买页面</a></div>
    <div><a class="share" href="javascript:;" onclick="testOpenUrlScheme('bw://redpack', 'inside')">发糖包</a></div>
    <div><a class="share" href="javascript:;" onclick="testOpenUrlScheme('bw://kyc', 'inside')">KYC</a></div>
    <div><a class="share" href="javascript:;" onclick="testOpenUrlScheme('bw://siginin', 'inside')">登录</a></div>
    <div><a class="share" href="tel:+86 13071163773">拨打电话</a></div>

    <div><a class="share" href="javascript:;" onclick="shareImg()">分享图片</a></div>
  </section>
  <footer class="footer">
    <a class="share" href="javascript:;" onclick="handleShare()">SHARE</a>
    <a class="buy" href="javascript:;" onclick="handlePay()">BUY</a>
  </footer>

<script type="text/javascript" src="./bcvwallet.min.js"></script>

<!-- 项目并不依赖 jQuery，这里只是作为请求数据使用 -->
<script type="text/javascript" src="./assets/jquery-3.3.1.min.js"></script>

<script>
var isBWConfigSuccess = false

// 从后端请求 config 配置数据
$.get('/index.php?api=getConfig', function (res) {
  // bcvWallet 初始化
  bcvWallet.config({
    debug: true, // 开启调试模式时会在网页底部生成一系列log记录
    appId: res.appId, // 必填，第三方的唯一标识
    timestamp: res.timestamp, // 必填，生成签名的时间戳
    nonceStr: res.nonceStr, // 必填，生成签名的随机串
    signature: res.signature,// 必填，签名
    jsApiList: [] // 非必填，目前可传入空数组，后续会加入权限判断校验
  })

  bcvWallet.ready(function () {
    // config 配置成功 可以调用其他接口了

    // 备注：调用 config 进行配置是一个客户端的异步操作，时间长短会受到网络环境的影响，如果 config 接口还未返回ready 或 error 回调就调用其他接口，该接口会调用失败，在 Android 手机上可能会导致整个配置过程失效，因此建议开发者设置一个变量管理 config 配置的状态，在 config 调用成功之前，不允许用户直接触发其他接口的调用。（此问题将在下一个版本更新中修复）
    isBWConfigSuccess = true
  })

  bcvWallet.error(function (res) {
    // config 配置失败 错误信息会在 res.errmsg 中给出
    console.log(res.errmsg)
  })
})

// 调用客户端分享
function handleShare () {
  if (!isBWConfigSuccess) return alert('币威钱包初始化中，请稍后再试...')
  bcvWallet.shareWechat({
    type: 'link',
    title: '这里是分享标题', // 非必填，分享标题（如果没有，自动调用网页title）
    thumb: 'http://p8k1ocuzy.bkt.clouddn.com/alipayCode_1539691504259_8519.png', // 非必填，分享缩略图
    desc: '这里是分享描述内容', // 非必填，分享描述
    url: 'http://sdkdemo.bitcv.com', // 非必填，分享链接（如果没有，默认使用当前网页链接）
    textCopy: '用于复制的文案', // 非必填，可以复制的文案，用户可以点击按钮复制该文案
    success: function (res) {
      // 分享成功（包括复制成功）后的回调函数
    }
  })
}

// 调用客户端支付
function handlePay () {
  // 发送购买请求给后端，后端去币威开放平台下单，并把订单数据返回给前端页面用于调起支付
  $.get('/index.php?api=transferOrder', function(res) {

    if (!isBWConfigSuccess) return alert('币威钱包初始化中，请稍后再试...')
    bcvWallet.requestPayment({
      accessToken: res.accessToken, // 必填，应用授权接口调用凭证
      tradeNo: res.tradeNo, // 必填，开放平台订唯一单号
      requestTime: res.requestTime, // 请求时间
      success: function (res) {
        // 支付成功后的回调函数
        alert('支付成功')
      }
    })
  })
}

// 调用客户端分享图片
function shareImg () {
  if (!isBWConfigSuccess) return alert('币威钱包初始化中，请稍后再试...')
  bcvWallet.shareWechat({
    type: 'image',
    imageUrl: 'https://cdn2.ettoday.net/images/1381/d1381774.jpg',
    success: function (res) {
      // 分享成功（包括复制成功）后的回调函数
    }
  })
}

// test
function testOpenUrl (url) {
  window.location.href = url
}
function testOpenUrlScheme (url, type) {
  bcvWallet.openUrlScheme({
    url: url,
    type: type,
    success: function (res) {
      alert('打开成功')
    }
  })
}
</script>

</body>
</html>