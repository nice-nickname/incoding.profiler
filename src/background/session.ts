import { IBackgroundMessage } from "@connection/types";

export class Session {

    private ports: Record<string, chrome.runtime.Port> = { }

    private disposeTimeout: ReturnType<typeof setTimeout>

    constructor(
        public id: string
    ) { }

    connect(key: string, port: chrome.runtime.Port) {
        this.disconnectIfExist(key)

        port.onMessage.addListener(this.onMessage)
        port.onDisconnect.addListener(this.onDisconnect)

        port.postMessage({ type: "connected" })

        this.ports[key] = port
    }

    dispose() {
        for (const key in this.ports) {
            this.disconnectIfExist(key)
        }
    }

    requestDispose(timeoutMs: number) {
        this.disposeTimeout = setTimeout(() => {
            this.dispose()
        }, timeoutMs)
    }

    cancelDispose() {
        clearTimeout(this.disposeTimeout)
    }

    private disconnectIfExist(key: string) {
        this.ports[key]?.disconnect()

        delete this.ports[key]
    }

    private onMessage = (message: IBackgroundMessage) => {
        const receiver = this.ports[message.to]

        if (receiver) {
            receiver.postMessage(message.data)
        }
    }

    private onDisconnect = (port: chrome.runtime.Port) => {
        port.onMessage.removeListener(this.onMessage)
        port.onDisconnect.removeListener(this.onDisconnect)
    }
}

