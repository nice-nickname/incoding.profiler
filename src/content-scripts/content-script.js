/**
 * content-script
 *
 * Establishing window listener to direct messages from injected script to background service-worker
 */


function onDevoolsMessage(message) {

}

function onDevtoolsDisconnect() {
    window.removeEventListener('message', onIncodingWindowMessage)
}

function onIncodingWindowMessage({ source, data }) {
    if (source !== this.window || !data) {
        return;
    }

    connection.postMessage(data)
}


const connection = chrome.runtime.connect({
    name: 'content-script'
})

connection.onMessage.addListener(onDevoolsMessage)
connection.onDisconnect.addListener(onDevtoolsDisconnect)

window.addEventListener('message', onIncodingWindowMessage)
