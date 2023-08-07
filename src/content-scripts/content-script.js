/**
 * content-script
 *
 * Establishing window listener to direct messages from injected script to background service-worker
 */

function establishRuntimeConnection() {
    const connection = chrome.runtime.connect({
        name: 'content-script'
    })

    connection.onMessage.addListener(function (message, sender) {

    })

    return connection
}

const connection = establishRuntimeConnection()

window.addEventListener('message', function onMessage({source, data}) {
    if (source !== this.window || !data) {
        return;
    }

    connection.postMessage(data)
})
