/**
 * devtools
 *
 * Establish background connection and handle events
 */

import ProfilerEvent from "./event-viewer/event"

const root = document.getElementById('root')
const eventList = document.querySelector('.event-list')

const _events = {}

const startProfiler = async () => {
    const tabId = String(chrome.devtools.inspectedWindow.tabId)
    const connection = chrome.runtime.connect({
        name: tabId
    })

    connection.onMessage.addListener(function (message, sender) {

        switch (message.name) {
            case 'execute-start':
                {
                    let event = new ProfilerEvent(message)
                    eventList.appendChild(event.html)
                    _events[message.id] = event
                }
                break;

            case 'execute-finish':
                {
                    let event = _events[message.id]
                    event.update(message)
                }
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
