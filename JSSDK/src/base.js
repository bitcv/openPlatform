// base variable and method
let ua = navigator.userAgent.toLowerCase() // navigator
let env = {}

const apiNameMap = {
  config: 'config',
  requestPayment: 'requestPayment',
  shareWechat: 'shareWechat',
  openUrlScheme: 'openUrlScheme',
  download: 'download'
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
let mat = ua.match(/bitcvwallet\/(ios|android)\/(\d+\.\d+\.\d+)(\/lang\/(\w{1,}))?/)
if (mat) {
  env.isInBitcvApp = true
  env.appPlatform = mat[1]
  env.appVersion = mat[2]
  env.appLanguage = mat[4] ? mat[4] : 'cn'
} else {
  env.isInBitcvApp = false
}

// config information
let bwCfg = {
  config: '',
  updateCfg (cfg) {
    bwCfg.config = cfg
  }
}

export default { ua, env, apiNameMap, bwCfg }
