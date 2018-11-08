import { env, apiNameMap, bwCfg } from './base'
import sdkLog from './sdkLog'
import { setupWebViewJavascriptBridge, invokeCmd } from './utils'

let bwAPI // API object

let configCB = {
  _readyCBs: []
} // config 执行完之后的回调
let stateInfo = {
  state: 0, // 0为初始值，配置错误为-1，配置成功为1
  res: {}
} // sdk 状态信息

// API
bwAPI = {
  env,
  config (parm) {
    bwCfg.updateCfg(parm)

    if (bwCfg.config && bwCfg.config.debug) {
      sdkLog('币威 JSSDK log 区域: ')
    }

    // 初始化 bridge
    setupWebViewJavascriptBridge(function (bridge) {
      // 初始化 app android 需要
      if (bridge.init) {
        bridge.init(function (msg, resCb) {})
      }

      invokeCmd(apiNameMap.config, parm, (function () {
        configCB._complete = function (res) {
          stateInfo.state = 1
        }

        // 带入执行 ready 中的回调，执行后清空 _readyCBs
        var cbArray = configCB._readyCBs
        configCB.success = function () {
          for (var i = 0, len = cbArray.length; i < len; i++) {
            cbArray[i]()
          }
          configCB._readyCBs = []
        }

        configCB.fail = function (res) {
          configCB._fail ? configCB._fail(res) : configCB.state = -1
        }

        configCB.complete = function () {}

        return configCB
      }()))
    })
  },
  ready (readyFunc) {
    if (stateInfo.state != 0) {
      sdkLog('ready')
      // config 配置结束
      readyFunc()
    } else {
      // config 配置未成功，将回调 push 到 _readyCBs 函数中，等待回调后执行
      configCB._readyCBs.push(readyFunc)
    }
  },
  error (errorFunc) {
    if (stateInfo.state == -1) {
      errorFunc(stateInfo.res)
    } else {
      configCB._fail = errorFunc
    }
  },
  requestPayment (parm) {
    invokeCmd(apiNameMap.requestPayment, parm, parm)
  },
  shareWechat (parm) {
    invokeCmd(apiNameMap.shareWechat, parm, parm)
  },
  openUrlScheme (parm) {
    invokeCmd(apiNameMap.openUrlScheme, parm, parm)
  }
}

export default bwAPI
