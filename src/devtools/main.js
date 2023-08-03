/**
 * Establish background connection and handle events
 */

const root = document.getElementById('root')

const startProfiler = async () => {
    const backgroundConnection = chrome.runtime.connect({
        name: String(chrome.devtools.inspectedWindow.tabId)
    })

    backgroundConnection.onMessage.addListener(function (message) {
        console.log('received', message)

        switch (message.name) {
            default:
                break;
        }
    })
}

chrome.devtools.inspectedWindow.eval(
    'ExecutableBase.name',
    (result, error) => {
        if (result !== 'ExecutableBase' || error)
            return root.innerHTML = 'This page does not support incoding.framework.js 🥲'

        startProfiler()
    })
