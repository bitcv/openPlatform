import { bwEnv, bwCfg } from './base'
import sdkLog from './sdkLog'

/* global WebViewJavascriptBridge */
// 注册初始化事件监听
function setupWebViewJavascriptBridge (callback) {
  if (bwEnv === 'android') {
    // Android使用
    if (window.WebViewJavascriptBridge) { return callback(window.WebViewJavascriptBridge) }
    document.addEventListener('WebViewJavascriptBridgeReady', function () {
      callback(window.WebViewJavascriptBridge)
    }, false)
  } else if (bwEnv === 'ios') {
    // iOS使用
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

// 发送命令给APP
function invokeCmd (cmd, parm, callback) {
  sdkLog('开始调用事件')
  if (window.WebViewJavascriptBridge) {
    window.WebViewJavascriptBridge.callHandler(cmd, formatParm(parm), function (res) {
      completeBridgeInteraction(cmd, res, callback)
    })
  } else {
    console.warn('调用失败，尚未完成config初始化')
    sdkLog('调用失败，尚未完成config初始化')
    completeBridgeInteraction(cmd, {
      errcode: 1,
      errmsg: 'SDK尚未 config 完成',
      data: {}
    }, callback)
  }
}

// 注册 APP 回调响应函数
function completeBridgeInteraction (cmd, res, callback) {
  sdkLog('接收到事件回调')
  sdkLog(cmd + '回调数据：' + JSON.stringify(res))
  /*
   * res APP回调过来的参数
   * errcode 返回的状态码  0:成功  1:失败  2:取消
   * errmsg 错误信息
   * data 返回的数据
   */
  callback = callback || {}

  // 优先执行 sdk 内部回调
  if (callback._complete) {
    callback._complete(res)
    delete callback._complete
  }

  // 执行用户回调
  switch (res.errcode) {
    case '0':
    case 0:
      callback.success && callback.success(res)
      break
    case '-1':
    case -1:
      callback.cancel && callback.cancel(res)
      break
    default:
      callback.fail && callback.fail(res)
  }
  callback.complete && callback.complete(res)
}

// 格式化传入的参数
function formatParm (parm) {
  parm = parm || {}
  sdkLog('调用数据：' + JSON.stringify(parm))
  parm.config = {
    appId: bwCfg.config.appId,
    signType: 'sha1',
    timestamp: bwCfg.config.timestamp + '',
    nonceStr: bwCfg.config.nonceStr,
    signature: bwCfg.config.signature
  }
  return parm
}

export default { setupWebViewJavascriptBridge, invokeCmd, completeBridgeInteraction, formatParm }
