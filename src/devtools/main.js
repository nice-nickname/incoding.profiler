/**
 * Establish background connection and handle events
 */

const root = document.getElementById('root')

const startProfiler = async () => {
    const backgroundConnection = chrome.runtime.connect({
        name: 'devtools-page'
    })

    backgroundConnection.onMessage.addListener(function (message) {
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
