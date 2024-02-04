/**
 * background
 *
 * Background serivice-worker for message exchanging
 */

'use strict'

import { keepBackgroundAlive } from "./persist-connection"

const connectionPorts = {}

if (!__FIREFOX__) {
    keepBackgroundAlive()
}

chrome.runtime.onConnect.addListener(function onConnect(port) {
    let name = null
    let tab = null

    if (Number.isInteger(+port.name)) {
        name = 'devtools'
        tab = +port.name
    }
    else {
        name = 'contentScript'
        tab = port.sender.tab.id
    }

    if (connectionPorts[tab] == undefined) {
        connectionPorts[tab] = {
            devtools: null,
            contentScript: null
        }
    }

    connectionPorts[tab][name] = port

    if (connectionPorts[tab].devtools != null && connectionPorts[tab].contentScript != null) {
        establishConnection(connectionPorts[tab].devtools, connectionPorts[tab].contentScript)
    }
})

function establishConnection(one, two) {
    const processMessageTo = (other) => function (message) {
        try {
            other.postMessage(message)
        }
        catch (error) {
            console.error(error)

            other.disconnect()
        }
    }

    const shutdown = (port, listener) => function () {
        port.onMessage.removeListener(listener)
    }

    const listenOne = processMessageTo(two)
    const listenTwo = processMessageTo(one)

    const shutdownOne = shutdown(one, listenOne)
    const shutdownTwo = shutdown(two, listenTwo)

    one.onMessage.addListener(listenOne)
    two.onMessage.addListener(listenTwo)

    one.onDisconnect.addListener(shutdownOne)
    two.onDisconnect.addListener(shutdownTwo)
}
