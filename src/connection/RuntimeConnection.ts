import Message, {
    BrowserMessages,
    DevtoolsMessages,
    SharedMessages
} from "./types"

type ListenMessages<T> = T & SharedMessages

class RuntimeConnection<
    TListen extends object,
    TEmit extends object
> {

    private connection: chrome.runtime.Port
    private listeners: Partial<Record<keyof ListenMessages<TListen>, Function>> = {}

    connect(tab: string) {
        this.connection = chrome.runtime.connect({ name: tab })

        this.connection.onMessage.addListener(this.onMessage)

        this.connection.onDisconnect.addListener(() => {
            this.onMessage({ type: "disconnected" })

            this.connection.onMessage.removeListener(this.onMessage)
        })

        this.onMessage({ type: "connected" })
    }

    disconnect() {
        this.disconnect()
    }

    emit<TKey extends keyof TEmit>(type: TKey, payload: TEmit[TKey]) {
        const message: Message<TEmit> = {
            type: type,
            payload: payload
        }

        this.connection.postMessage(message)
    }

    on<Tkey extends keyof ListenMessages<TListen>>(type: Tkey, handler: (payload: ListenMessages<TListen>[Tkey]) => void) {
        this.listeners[type] = handler
    }

    private onMessage = (message: Message<ListenMessages<TListen>>) => {
        const handler = this.listeners[message.type]

        if (!handler) {
            console.warn(`there is no handler assosiated with ${String(message.type)}`)
            return
        }
        handler?.call(this, message.payload)
    }
}

export type DevtoolsConnection = RuntimeConnection<DevtoolsMessages, BrowserMessages>
export type BrowserConnection = RuntimeConnection<BrowserMessages, DevtoolsMessages>

export default RuntimeConnection
