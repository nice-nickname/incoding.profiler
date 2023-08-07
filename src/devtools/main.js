/**
 * devtools
 *
 * Establish background connection and handle events
 */

const root = document.getElementById('root')

const startProfiler = async () => {
    const tabId = String(chrome.devtools.inspectedWindow.tabId)
    const connection = chrome.runtime.connect({
        name: tabId
    })

    connection.onMessage.addListener(function (message, sender) {
        console.log('devtools message received');

        switch (message.name) {
            case 'execute-start':
                break;

            case 'execute-finish':
                break;

            default:
                break;
        }
    })
}


chrome.devtools.inspectedWindow.eval(
    'ExecutableBase.name',
    (result, error) => {
        if (result !== 'ExecutableBase' || error)
            return root.innerHTML = 'This page does not support incoding.framework.js 😢'

        startProfiler()
    })
