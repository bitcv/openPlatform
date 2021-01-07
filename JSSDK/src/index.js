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

let logsEl // log wrap

// print log
function sdkLog (text) {
  if (configInfo.config && configInfo.config.debug) {
    if (!logsEl) {
      logsEl = document.createElement('div')
      logsEl.setAttribute('id', 'bcvWalletLogs')
      document.body.appendChild(logsEl)
    }

    let log = document.createElement('p')
    log.setAttribute('id', 'bcvWalletLog')
    log.setAttribute('style', 'word-break:break-all;background:#eee;z-index:9999;');
    log.style.fontSize = '14px'
    log.innerHTML = '- ' + text
    logsEl.appendChild(log)
  }
}

// bridge 初始化
/* global WebViewJavascriptBridge */
function setupWebViewJavascriptBridge (callback) {
  if (env.isInBitcvApp && env.appPlatform === 'android') {
    // Android使用
    if (window.WebViewJavascriptBridge) {
      sdkLog('Android - has bridge')
      return callback(window.WebViewJavascriptBridge)
    }
    sdkLog('Android - no bridge and waiting for bridge ready')
    document.addEventListener('WebViewJavascriptBridgeReady', function () {
      sdkLog('Android - bridge ready now')
      callback(window.WebViewJavascriptBridge)
    }, false)
  } else if (env.isInBitcvApp && env.appPlatform === 'ios') {
    // iOS使用
    if (window.WebViewJavascriptBridge) {
      sdkLog('iOS - has bridge')
      return callback(WebViewJavascriptBridge)
    }
    sdkLog('iOS - no bridge and waiting for WVJBCallbacks')
    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge) }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback) }
    window.WVJBCallbacks = [callback]
    var WVJBIframe = document.createElement('iframe')
    WVJBIframe.style.display = 'none'
    WVJBIframe.src = 'https://__bridge_loaded__'
    document.documentElement.appendChild(WVJBIframe)
    setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
  } else {
    sdkLog('非bcvWallet环境，无法使用SDK相关功能')
    console.warn('非bcvWallet环境，无法使用SDK相关功能')
  }
}

// 检查并执行交互命令
function checkConfigAndExecute (cmd, parm, func) {
  console.log(configInfo.config)
  console.log(configInfo.status)
  if (configInfo.status === 1) {
    func()
  } else {
    sdkLog(`${cmd}执行失败，尚未完成config初始化`)
    console.error(`${cmd}执行失败，尚未完成config初始化`)
    completeBridgeInteraction(cmd, {
      errcode: 1,
      errmsg: 'SDK尚未 config 完成',
      data: {}
    }, parm)
  }
}

// 调用 APP 命令
function callCmd (cmd, parm = {}) {
  sdkLog(`开始调用事件${cmd}`)
  sdkLog('调用数据：' + JSON.stringify(parm))
  window.WebViewJavascriptBridge.callHandler(cmd, formatParm(parm), function (res) {
    completeBridgeInteraction(cmd, res, parm)
  })
}

// 注册命令给 APP 调用
function registerCmd (cmd, callback = function () {}) {
  sdkLog(`开始注册事件${cmd}`)
  window.WebViewJavascriptBridge.registerHandler(cmd, callback)
}

// 包装 APP 回调响应函数
function completeBridgeInteraction (cmd, res, parm = {}) {
  sdkLog(`接收到${cmd}事件回调`)
  sdkLog('回调数据：' + JSON.stringify(res))
  /*
   * res APP回调过来的参数
   * res.errcode 返回的状态码 { 0: '成功', '1/大于0': '失败', -1: '取消' }
   * res.errmsg 错误信息
   * res.data 返回的数据
   */
  // 执行用户回调
  switch (res.errcode) {
    case '0':
    case 0:
      parm.success && parm.success(res)
      break
    case '-1':
    case -1:
      parm.cancel && parm.cancel(res)
      break
    default:
      parm.fail && parm.fail(res)
  }
  parm.complete && parm.complete(res)
}

// 格式化传入的参数
function formatParm (parm) {
  parm.config = {
    appId: configInfo.config.appId,
    signType: 'sha1',
    timestamp: configInfo.config.timestamp + '',
    nonceStr: configInfo.config.nonceStr,
    signature: configInfo.config.signature
  }
  return parm
}

let bwAPI // API object
// API
bwAPI = {
  env,
  config (parm) {
    configInfo.update('config', parm)
    // init bridge and config
    setupWebViewJavascriptBridge(function (bridge) {
      // init android doc:https://github.com/hjhrq1991/JsBridge
      bridge.init && bridge.init(function () {})

      callCmd(apiNameMap.config, {
        ...parm,
        success () {
          configInfo.update('status', 1)
          configInfo._success && configInfo._success()
        },
        fail (res) {
          configInfo.update('status', -1)
          configInfo.update('_failRes', res)
          configInfo._fail && configInfo._fail(res)
        }
      })
    })
  },
  ready (readyFunc) {
    if (configInfo.status == 1) {
      sdkLog('config ready')
      readyFunc()
    } else {
      configInfo.update('_success', readyFunc)
    }
  },
  error (errorFunc) {
    if (configInfo.status == -1) {
      sdkLog('config error')
      errorFunc(configInfo._failRes)
    } else {
      configInfo.update('_fail', errorFunc)
    }
  },

  // 支付
  requestPayment (parm) {
    checkConfigAndExecute(apiNameMap.requestPayment, parm, function () {
      callCmd(apiNameMap.requestPayment, parm)
    })
  },
  // 分享
  shareWechat (parm) {
    checkConfigAndExecute(apiNameMap.shareWechat, parm, function () {
      callCmd(apiNameMap.shareWechat, parm)
    })
  },
  // 跳转 URL
  openUrlScheme (parm) {
    checkConfigAndExecute(apiNameMap.openUrlScheme, parm, function () {
      callCmd(apiNameMap.openUrlScheme, parm)
    })
  },
  // 下载
  download (parm) {
    checkConfigAndExecute(apiNameMap.download, parm, function () {
      callCmd(apiNameMap.download, parm)
    })
  },
  // 扫一扫
  scanQRCode (parm) {
    checkConfigAndExecute(apiNameMap.scanQRCode, parm, function () {
      callCmd(apiNameMap.scanQRCode, parm)
    })
  },
  // 新版分享
  mediaShare (parm) {
    checkConfigAndExecute(apiNameMap.mediaShare, parm, function () {
      callCmd(apiNameMap.mediaShare, parm)
    })
  },
  // 页面 UI 配置
  pageInit (parm) {
    checkConfigAndExecute(apiNameMap.pageInit, parm, function () {
      // 如果导航栏有按钮，注册导航栏按钮响应回调事件
      if (parm.navbarItemType !== 'none') {
        registerCmd(apiNameMap.navbarItemCallback, parm.navbarItemCallback)
      }
      callCmd(apiNameMap.pageInit, parm)
    })
  }
}

export default bwAPI
