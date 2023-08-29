/**
 * devtools
 *
 * Establish background connection and handle events
 */

import './pages/EventList/index'

import { ProfilerMessage } from "./messages/messages";
import { IncodingEventExecutedMessage, IncodingEventMessage } from './messages/messages-list';

const root = document.getElementById('root')
const eventListPage = document.createElement('event-list-page')

chrome.devtools.inspectedWindow.eval(
    'ExecutableBase.name',
    (result, error) => {
        if (result !== 'ExecutableBase' || error)
            return root.innerHTML = 'This page does not support incoding.framework.js 😢'

        startProfiler()
    })


async function startProfiler() {
    const tabId = String(chrome.devtools.inspectedWindow.tabId)
    const connection = chrome.runtime.connect({
        name: tabId
    })

    connection.onMessage.addListener(onProfilerMessage)

    root.appendChild(eventListPage)
}


function onProfilerMessage(message: ProfilerMessage) {
    console.log(message);

    switch (message.name) {
        case 'execute-start':
            document.querySelector('event-list').addExecutionMessage(message.data as IncodingEventMessage)
            break;

        case 'execute-finish':
            document.querySelector('event-list').addExecutedMessage(message.data as IncodingEventExecutedMessage)
            break;

        default:
            break;
    }
}
