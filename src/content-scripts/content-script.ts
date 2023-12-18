/**
 * content-script
 *
 * Establishing window listener to direct messages from injected script to background service-worker
 */

import RuntimeConnection, { BrowserConnection } from "@connection/RuntimeConnection"

const connection: BrowserConnection = new RuntimeConnection()

function onWindowMessage({ source, data }: any) {
    if (source !== window || !data) {
        return;
    }

    connection.emit(data.type, data.payload)
}

connection.on('connected', () => {
    window.addEventListener('message', onWindowMessage)
})

connection.on('disconnected', () => {
    window.removeEventListener('message', onWindowMessage)
})

connection.on('inspect-element', elementId => {
    window.inspect(document.querySelector(`data-profiler-id="${elementId}"`))
})

connection.connect('content-script')
