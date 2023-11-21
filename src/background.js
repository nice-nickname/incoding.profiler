/**
 * background
 *
 * Background serivice-worker for message exchanging
 */

'use strict'

let keepingAliveInterval

const connectionPorts = {}

keepBackgroundAlive()
dynamiclyInjectContentScript()

chrome.runtime.onConnect.addListener(function onConnect(port) {
    let name = null
    let tab = null

    if (Number.isInteger(+port.name)) {
        name = 'devtools'
        tab = +port.name

        installContentScript(tab)
    }
    else {
        name = 'contentScript'
        tab = port.sender.tab.id
    }

    if (connectionPorts[tab] == undefined) {
        connectionPorts[tab] = {
            debtools: null,
            contentScript: null
        }
    }

    connectionPorts[tab][name] = port

    if (connectionPorts[tab].devtools != null && connectionPorts[tab].contentScript != null) {
        establishBidirectionalConnection(tab, connectionPorts[tab].devtools, connectionPorts[tab].contentScript)
    }
})


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


async function installContentScript(tab) {
    const contentScript = {
        files: ['content_script.js'],
        target: {
            tabId: tab
        },
        world: "ISOLATED"
    }

    try {
        await chrome.scripting.executeScript(contentScript)
    }
    catch (error) {
        console.error(error);
    }
}


function establishBidirectionalConnection(tabId, one, two) {
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
        console.warn('devtools connection shutdown')

        one.onMessage.removeListener(listenerOne);
        two.onMessage.removeListener(listenerTwo);
        one.disconnect();
        two.disconnect();

        connectionPorts[tabId] = null;

        killBackground()
    }
}


/**
 * background.js tries to go inactive if no actions is perfomed by service_worker,
 * so by that, we'll try to keep him alive by constantly running some actions
 * @see https://developer.chrome.com/docs/extensions/migrating/to-service-workers
 */
async function keepBackgroundAlive() {
    keepingAliveInterval = setInterval(tick, 5 * 1000)
}


/**
 * some low-cost action
 */
async function tick() {
    await chrome.storage.local.set({ '_': Date.now() })
}


/**
 * allowing background.js to kill himself
 */
function killBackground() {
    clearInterval(keepingAliveInterval)
}
