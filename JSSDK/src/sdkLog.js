import { configInfo } from './base'

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

export default sdkLog
