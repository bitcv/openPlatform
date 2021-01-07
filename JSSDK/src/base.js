// base variable and method
const ua = navigator.userAgent.toLowerCase() // navigator
let env = {}

const apiNameMap = {
  config: 'config',
  requestPayment: 'requestPayment', // 支付
  shareWechat: 'shareWechat', // 分享到微信
  openUrlScheme: 'openUrlScheme', // 打开链接
  download: 'download', // 下载图片
  scanQRCode: 'scanQRCode', // 扫码
  mediaShare: 'mediaShare', // 新版分享
  pageInit: 'pageInit', // 页面 UI 配置
  navbarItemCallback: 'navbarItemCallback' // 页面 UI 配置中导航栏按钮响应事件
}

// platform info
if (ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1) {
  env.platform = 'android'
} else if (ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
  env.platform = 'ios'
} else {
  env.platform = 'desktop'
}

// bitcvwallet info
let mat = ua.match(/bitcvwallet\/(ios|android)\/(\d+\.\d+(\.\d+)?)(\/lang\/(\w{1,}))?/)
if (mat) {
  env.isInBitcvApp = true
  env.appPlatform = mat[1]
  env.appVersion = mat[2]
  env.appLanguage = mat[5] ? mat[5] : 'cn'
} else {
  env.isInBitcvApp = false
}

// config information
let ConfigManage = function () {
  this.config = {} // 用户传入的 config 信息
  this.status = 0 // 状态 { 0: '默认值，未配置', 1: '配置成功', -1: '配置失败' }
  this._success = null // 初始化时内部成功回调
  this._fail = null // 初始化时内部失败回调
  this._failRes = {} // 初始化失败时回调信息
}
ConfigManage.prototype.update = function (key, value) {
  this[key] = value
}
let configInfo = new ConfigManage()

export default {
  ua,
  env,
  apiNameMap,
  configInfo
}
