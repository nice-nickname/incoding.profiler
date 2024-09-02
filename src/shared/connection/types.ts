import type DevtoolsMessages from "@devtools/api"
import type BrowserMessages from "@content-scripts/api"

type Message<TMessages> = {
    type: keyof TMessages,
    payload?: TMessages[keyof TMessages]
}

type ConnectedMessage = void
type DisconnectedMessage = void

type SharedMessages = {
    'connected': ConnectedMessage,
    'disconnected': DisconnectedMessage
}

export {
    SharedMessages,

    DevtoolsMessages,
    BrowserMessages
}

export type Peer = 'devtools' | 'popup' | 'content-script'

export interface IBackgroundMessage {
    from: Peer,
    to: Peer,
    data: unknown
}

export default Message
