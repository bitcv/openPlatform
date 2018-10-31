// base variable and method
let nav = navigator.userAgent.toLowerCase() // navigator
let bwEnv // bcvwallet env (ios || android || other)
let bwVer // bcvwallet version

const apiNameMap = {
  config: 'config',
  requestPayment: 'requestPayment',
  shareWechat: 'shareWechat',
  openUrlScheme: 'openUrlScheme'
}

// init bwEnv
if (nav.match(/bitcvwallet\/ios/i) == 'bitcvwallet/ios') {
  bwEnv = 'ios'
} else if (nav.match(/bitcvwallet\/android/i) == 'bitcvwallet/android') {
  bwEnv = 'android'
} else {
  bwEnv = 'other'
}

// init bwVer
let version = nav.match(/bitcvwallet\/(\d+\.\d+\.\d+)/) || nav.match(/bitcvwallet\/(\d+\.\d+)/)
bwVer = version ? version[1] : ''

// config information
let bwCfg = {
  config: '',
  updateCfg (cfg) {
    bwCfg.config = cfg
  }
}

export default { nav, bwEnv, bwVer, apiNameMap, bwCfg }
