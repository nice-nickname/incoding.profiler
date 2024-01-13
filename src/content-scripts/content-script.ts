/**
 * content-script
 *
 * Establishing window listener to direct messages from injected script to background service-worker
 */

import RuntimeConnection, { BrowserConnection } from "@connection/RuntimeConnection"

const connection: BrowserConnection = new RuntimeConnection()

connection.on('connected', () => {
    window.addEventListener('message', onWindowMessage)
})

connection.on('disconnected', () => {
    window.removeEventListener('message', onWindowMessage)
})

connection.connect('content-script')

function onWindowMessage({ source, data }: any) {
    if (source !== window || !data) {
        return;
    }

    connection.emit(data.type, data.payload)
}
