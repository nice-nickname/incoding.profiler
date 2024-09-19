import Message, {
    BrowserMessages,
    DevtoolsMessages,
    Peer,
    PopupMessages,
    SharedMessages
} from "./types"

type ListenMessages<T> = T & SharedMessages

class BackgroundConnection<
    TName extends Peer,
    TListen extends object,
    TEmit extends object
    > {

    private connection: chrome.runtime.Port

    private listeners: Partial<Record<keyof ListenMessages<TListen>, Function>> = {}

    constructor(
        private name: TName
    ) { }

    connect(name: string) {
        this.connection = chrome.runtime.connect({ name: name })

        this.connection.onMessage.addListener(this.onMessage)

        this.connection.onDisconnect.addListener(() => {
            this.onMessage({ type: "disconnected" })

            this.connection.onMessage.removeListener(this.onMessage)
        })
    }

    disconnect() {
        this.connection.disconnect()
    }

    emit<TKey extends keyof TEmit>(to: Exclude<Peer, TName>, type: TKey, payload?: TEmit[TKey]) {
        const data: Message<TEmit> = { type: type, payload: payload }

        this.connection.postMessage({
            from: this.name,
            to: to,
            data: data
        })
    }

    on<Tkey extends keyof ListenMessages<TListen>>(
        type: Tkey,
        handler: (payload: ListenMessages<TListen>[Tkey]) => void) {

        this.listeners[type] = handler
    }

    private onMessage = (message: Message<ListenMessages<TListen>>) => {
        const handler = this.listeners[message.type]

        if (!handler) {
            console.warn('devtools.js', `there is no handler assosiated with ${String(message.type)}`)
            return
        }

        handler?.call(this, message.payload)
    }
}

export type DevtoolsConnection = BackgroundConnection<'devtools', DevtoolsMessages, BrowserMessages & PopupMessages>
export type BrowserConnection = BackgroundConnection<'content-script', BrowserMessages, DevtoolsMessages>
export type PopupConnection = BackgroundConnection<'popup', PopupMessages, DevtoolsMessages>

export default BackgroundConnection
