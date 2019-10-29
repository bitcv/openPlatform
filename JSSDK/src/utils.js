import { env, configInfo } from './base'
import sdkLog from './sdkLog'

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

export default {
  setupWebViewJavascriptBridge,
  checkConfigAndExecute,
  callCmd,
  registerCmd
}
