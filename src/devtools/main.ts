/**
 * devtools
 *
 * Establish background connection and handle events
 */

import './pages/EventList/index'

import { ProfilerMessage } from "../messages/messages";
import { IncodingEventExecutedMessage, IncodingEventMessage } from '../messages/messages-list';
import { push, update } from './slices/eventList';
import store from './store';

const root = document.getElementById('root')!

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

    root.appendChild(document.createElement('event-list-page'))
}


function onProfilerMessage(message: ProfilerMessage) {
    switch (message.name) {
        case 'execute-start':
            store.dispatch(push(<IncodingEventMessage>message.data))
            break;

        case 'execute-finish':
            store.dispatch(update(<IncodingEventExecutedMessage>message.data))
            break;

        default:
            break;
    }
}
