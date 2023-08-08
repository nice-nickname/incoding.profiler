/**
 * devtools
 *
 * Establish background connection and handle events
 */

import { IncodingEvent } from "./event-viewer/event-list"

const root = document.getElementById('root')
const eventList = document.querySelector('.event-list')

const startProfiler = async () => {
    const tabId = String(chrome.devtools.inspectedWindow.tabId)
    const connection = chrome.runtime.connect({
        name: tabId
    })

    connection.onMessage.addListener(function (message, sender) {



        switch (message.name) {
            case 'execute-start':
                eventList.appendChild(new IncodingEvent(message).htmlContent)
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
