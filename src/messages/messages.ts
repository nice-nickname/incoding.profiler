import {
    IncodingEventExecutedMessage,
    IncodingEventMessage
} from "./messages-list"

interface Messages {
    'execute-start': IncodingEventMessage
    'execute-finish': IncodingEventExecutedMessage
}

export interface ProfilerMessage {
    name: keyof Messages,
    data: Messages[keyof Messages]
}

export default function sendMessage<TKey extends keyof Messages>(source: Window | chrome.runtime.Port, name: TKey, data: Messages[TKey]) {
    const message: ProfilerMessage = {
        data: data,
        name: name
    }

    source.postMessage(message)
}
