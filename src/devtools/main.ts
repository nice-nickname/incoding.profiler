/**
 * devtools
 *
 * Establish background connection and handle events
 */

import { ProfilerMessage } from "./messages/messages";

const root = document.getElementById('root')

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
}


function onProfilerMessage(message: ProfilerMessage) {
    console.log(message);

    switch (message.name) {
        case 'execute-start':
            break;

        case 'execute-finish':
            break;

        default:
            break;
    }
}
