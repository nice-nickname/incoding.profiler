/**
 * content-script
 *
 * Establishing window listener to direct messages from injected script to background service-worker
 */

import BackgroundConnection, { BrowserConnection } from "@connection/background-connection";

const connection: BrowserConnection = new BackgroundConnection('content-script')

connection.on('connected', () => {
    window.addEventListener('message', onWindowMessage)
})

connection.on('disconnected', () => {
    window.removeEventListener('message', onWindowMessage)
})

document.onreadystatechange = () => {
    if (document.readyState === 'interactive') {
        connection.connect('content-script')

        injectProfilerToPage()
    }

    if (document.readyState === 'complete') {
        connection.emit('devtools', 'refresh')
    }
};


function onWindowMessage({ source, data }: any) {
    if (source !== window || !data) {
        return;
    }

    connection.emit('devtools', data.type, data.payload)
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
