import { bwCfg } from './base'

let logEl // record log

// print log
function sdkLog (text) {
  if (bwCfg.config && bwCfg.config.debug) {
    if (logEl == undefined) {
      logEl = document.createElement('p')
      logEl.setAttribute('id', 'bcvWalletLog')
      logEl.setAttribute('style', 'word-break:break-all;background:#eee;z-index:9999;');
      logEl.style.fontSize = '14px'
      document.body.appendChild(logEl)
    }
    let logText = logEl.innerHTML + text + '----------'
    logEl.innerHTML = logText
  }
}

export default sdkLog
