/**
 * content-script
 *
 * Establishing window listener to direct messages from injected script to background service-worker
 */

import RuntimeConnection, { BrowserConnection } from "@connection/RuntimeConnection";

const connection: BrowserConnection = new RuntimeConnection()

connection.on('connected', () => {
    window.addEventListener('message', onWindowMessage)
})

connection.on('disconnected', () => {
    window.removeEventListener('message', onWindowMessage)
})

function onWindowMessage({ source, data }: any) {
    if (source !== window || !data) {
        return;
    }

    connection.emit(data.type, data.payload)
}

document.onreadystatechange = () => {
    if (document.readyState === 'interactive') {
        connection.connect('content-script')

        injectProfilerToPage()
    }

    if (document.readyState === 'complete') {
        connection.emit('refresh')
    }
};

/**
 * Firefox manifest does not support executionWorld.MAIN, so we have to
 * manually inject profiling script as <script> tag in document
 */
function injectProfilerToPage() {
    const script = document.createElement('script')
    script.src = chrome.runtime.getURL('inject_profiler.js')

    document.head.appendChild(script)
}
