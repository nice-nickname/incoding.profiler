/**
 * content-script
 *
 * Establishing window listener to direct messages from injected script to background service-worker
 */

async function establishRuntimeConnection() {
    const connection = chrome.runtime.connect({
        name: 'content-script'
    })

    connection.onMessage.addListener(function (message, sender) {

    })
}

window.addEventListener('message', function onMessage({source, data}) {
    if (source !== this.window || !data) {
        return;
    }

    const message = data
    message.source = 'incoding.profiler.script'

    chrome.runtime.sendMessage(message)
})
