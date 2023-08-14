/**
 * content-script
 *
 * Establishing window listener to direct messages from injected script to background service-worker
 */


const connection = chrome.runtime.connect({
    name: 'content-script'
})

connection.onMessage.addListener(onDevoolsMessage)
connection.onDisconnect.addListener(onDevtoolsDisconnect)

window.addEventListener('message', onWindowMessage)


function onDevoolsMessage(message) {

}


function onDevtoolsDisconnect() {
    window.removeEventListener('message', onWindowMessage)
}


function onWindowMessage({ source, data }) {
    if (source !== this.window || !data) {
        return;
    }

    connection.postMessage(data)
}
