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

    private batchers: Record<keyof ListenMessages<TEmit>, Batcher<Message<TEmit>>>

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
        this.connection.disconnect()
    }

    emit<TKey extends keyof TEmit>(type: TKey, payload?: TEmit[TKey]) {
        const message: Message<TEmit> = {
            type: type,
            payload: payload
        }

        this.connection.postMessage(message)
    }

    batch<TKey extends keyof TEmit>(type: TKey, payload?: TEmit[TKey]) {
        const message: Message<TEmit> = {
            type: type,
            payload: payload
        }

        if (!this.batchers[type]) {
            this.batchers[type] = this.createBatcher()
        }

        this.batchers[type].push(message)
    }

    on<Tkey extends keyof ListenMessages<TListen>>(
        type: Tkey,
        handler: (payload: ListenMessages<TListen>[Tkey]) => void) {

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

    private createBatcher() {
        return new Batcher<Message<TEmit>>(1000, 10, (items) => {
            this.connection.postMessage(items)
        })
    }
}

class Batcher<T> {

    private internalTimeout: ReturnType<typeof setTimeout> | null

    private bucket: T[]

    constructor(
        private delay: number,
        private bucketSize: number,
        private callback: (items: T[]) => void
    ) {
        this.internalTimeout = null
        this.bucket = []
    }

    public push(data: T) {
        this.bucket.push(data)

        if (this.bucket.length == this.bucketSize) {
            this.invokeCallbackAndClearBucket()
        }

        this.restartTimer()
    }

    private restartTimer() {
        clearTimeout(this.internalTimeout!)

        if (this.bucket.length === 0) return

        this.internalTimeout = setTimeout(() => {
            this.invokeCallbackAndClearBucket()
        }, this.delay)
    }

    private invokeCallbackAndClearBucket() {
        this.callback([...this.bucket])
        this.bucket = []
    }
}

export type DevtoolsConnection = RuntimeConnection<DevtoolsMessages, BrowserMessages>
export type BrowserConnection = RuntimeConnection<BrowserMessages, DevtoolsMessages>

export default RuntimeConnection
