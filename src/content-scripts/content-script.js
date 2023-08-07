/**
 * content-script
 *
 * Establishing window listener to direct messages from injected script to background service-worker
 */


// handler for events from devtools
function onDevoolsMessage(message) {

}

// remove listener to be able restore connection if debtools was closed
function onDevtoolsDisconnect() {
    window.removeEventListener('message', onIncodingWindowMessage)
}

// handler for message from inspected window
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
