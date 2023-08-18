/**
 * devtools
 *
 * Establish background connection and handle events
 */

const root = document.getElementById('root')


function onProfilerMessage(message, sender) {
    switch (message.name) {
        case 'execute-start':
            break;

        case 'execute-finish':
            break;

        default:
            break;
    }
}


const startProfiler = async () => {
    const tabId = String(chrome.devtools.inspectedWindow.tabId)
    const connection = chrome.runtime.connect({
        name: tabId
    })

    connection.onMessage.addListener(onProfilerMessage)
}


chrome.devtools.inspectedWindow.eval(
    'ExecutableBase.name',
    (result, error) => {
        if (result !== 'ExecutableBase' || error)
            return root.innerHTML = 'This page does not support incoding.framework.js 😢'

        startProfiler()
    })
