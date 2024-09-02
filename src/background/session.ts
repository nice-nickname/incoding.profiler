import { IBackgroundMessage, Peer } from "@connection/types";

export class Session {

    private connections: Map<Peer, chrome.runtime.Port>

    constructor(
        private id: string
    ) {
        this.connections = new Map<Peer, chrome.runtime.Port>()
    }

    connect(key: Peer, port: chrome.runtime.Port) {

        this.connections.set(key, port);

        port.onMessage.addListener(this.onMessage)
        port.onDisconnect.addListener(() => this.disconnect(key))
    }

    private onMessage = (message: IBackgroundMessage) => {
        const receiver = this.connections.get(message.to)

        receiver?.postMessage(message.data)
    }

    private disconnect = (key: Peer) => {
        const port = this.connections.get(key)
        this.connections.delete(key)

        port?.onMessage.removeListener(this.onMessage)
    }

    dispose() {
        for (const [key, port] of this.connections.entries()) {
            this.disconnect(key)
            port.disconnect()
        }

        this.connections.clear()
    }
}

export class SessionFactory {

    static sessions: Map<string, Session> = new Map<string, Session>()

    static get(id: string): Session {
        if (!this.sessions.has(id)) {
            this.sessions.set(id, new Session(id))
        }

        return this.sessions.get(id)!
    }
}

