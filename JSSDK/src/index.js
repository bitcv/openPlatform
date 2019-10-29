import { env, apiNameMap, configInfo } from './base'
import sdkLog from './sdkLog'
import { setupWebViewJavascriptBridge, checkConfigAndExecute, callCmd, registerCmd } from './utils'

let bwAPI // API object

// API
bwAPI = {
  env,
  config (parm) {
    configInfo.update('config', parm)
    sdkLog('币威 JSSDK log 区域: ')
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
