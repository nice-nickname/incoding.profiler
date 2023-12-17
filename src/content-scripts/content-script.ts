/**
 * content-script
 *
 * Establishing window listener to direct messages from injected script to background service-worker
 */

import RuntimeConnection, { BrowserConnection } from "@connection/RuntimeConnection"
import Message, { DevtoolsMessages } from "@connection/types";


const connection: BrowserConnection = new RuntimeConnection()

connection.connect('content-script')

window.addEventListener('message', function({ source, data }) {
    if (source !== this.window || !data) {
        return;
    }
    const message = data as Message<DevtoolsMessages>

    connection.emit(message.type, message.payload)
})

connection.on('inspect-element', elementId => {
    window.inspect(document.querySelector(`data-profiler-id="${elementId}"`))
})
