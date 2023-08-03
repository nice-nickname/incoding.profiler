/**
 * Background serivice-worker for message exchanging
 */

'use strict'

const ports = {}

async function dynamiclyInjectContentScript() {
    const scriptsToInject = [
        {
            id: 'inject-profiler',
            matches: ['<all_urls>'],
            js: ['inject_profiler.js'],
            world: 'MAIN',
            runAt: 'document_end'
        }
    ]

    try {
        await chrome.scripting.unregisterContentScripts()
        await chrome.scripting.registerContentScripts(scriptsToInject)
    }
    catch (error) {
        console.error(error)
    }
}

dynamiclyInjectContentScript()

chrome.runtime.onConnect.addListener(function onConnect(port) {
    console.log(port)
    const tabId = +port.name

    if (Number.isInteger(tabId)) {
        ports[tabId] = port
    }

    // port.onDisconnected.addListener(port => {
    //     delete ports[tabId]
    // })
})

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (sender.tab) {
        let tabId = sender.tab.id;
        if (tabId in ports) {
            ports[tabId].postMessage(message);
        }
        else {
            console.log("Tab not found in connection list.");
        }
    }
    else {
        console.log("sender.tab not defined.");
    }
    return true;
});
