/**
 * Background serivice-worker for message exchanging
 */

'use strict'

const connectionPorts = {}

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
    const name = null
    const tab = null

    if (Number.isInteger(+port.name)) {
        name = 'devtools'
        tab = +port.name
    }
    else {
        name = 'contentScript'
        tab = port.sender.tab.id
    }

    connectionPorts[tab][name] = port

    if (connectionPorts[tab].devtools != null && connectionPorts[tab].contentScript != null) {
        establishBidirectionalConnection(connectionPorts[tab].devtools, connectionPorts[tab].contentScript)
    }
    // port.onDisconnected.addListener(port => {
    //     delete ports[tabId]
    // })
})

function establishBidirectionalConnection(one, two) {

    const listen = (anotherPort) => function (message) {
        try {
            anotherPort.postMessage(message)
        }
        catch (error) {
            console.error(error)
            shutdown()
        }
    }

    const listenerOne = listen(two)
    const listenerTwo = listen(one)

    one.onMessage.addListener(listenerOne)
    two.onMessage.addListener(listenerTwo)


    one.onDisconnect.addListener(shutdown);
    two.onDisconnect.addListener(shutdown);


    function shutdown() {
        one.onMessage.removeListener(listenerOne);
        two.onMessage.removeListener(listenerTwo);
        one.disconnect();
        two.disconnect();

        ports[tabId] = null;
    }
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    const tab = sender.tab

    if (tab) {
        let tabId = tab.id;

        if (tabId in connectionPorts) {
            connectionPorts[tabId]
        }

        const { devtools, contentScript } = connectionPorts[tabId]

        switch (message.name) {

            default:
                break;
        }
    }

    return true;
});
