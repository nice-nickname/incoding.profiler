/**
 * content-script
 *
 * Establishing window listener to direct messages from injected script to background service-worker
 */

window.addEventListener('message', function onMessage({source, data}) {
    if (source !== this.window || !data) {
        return;
    }

    const message = data
    message.source = 'incoding.profiler.script'

    chrome.runtime.sendMessage(message)
})
