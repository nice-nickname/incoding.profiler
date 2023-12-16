import {
    MessageRegistry,
    MessagePayload,
    OnMessageHandler,
    MessageTypes
} from './types'

export class RuntimeConnection {

    private connection: chrome.runtime.Port
    private listeners: Record<MessageTypes, Function>

    connect(tab: string) {
        this.connection = chrome.runtime.connect({ name: tab })

        this.connection.onMessage.addListener(this.onMessage)
    }

    disconnect() {
        this.connection.onMessage.removeListener(this.onMessage)

        this.disconnect()
    }

    on<Tkey extends MessageTypes>(type: Tkey, handler: OnMessageHandler<Tkey>) {
        this.listeners[type] = handler
    }

    post<TKey extends MessageTypes>(type: TKey, payload: MessagePayload<TKey>) {
        this.connection.postMessage({
            type,
            payload
        })
    }

    private onMessage(message: MessageRegistry) {
        const handler = this.listeners[message.type]

        handler?.call(this, message.payload)
    }
}
