import type DevtoolsMessages from "@devtools/api"
import type BrowserMessages from "@content-scripts/api"

type Message<TMessages> = {
    type: keyof TMessages,
    payload?: TMessages[keyof TMessages]
}

type ConnectedMessage = void
type DisconnectedMessage = number

type SharedMessages = {
    'connected': ConnectedMessage,
    'disconnected': DisconnectedMessage
}

export {
    SharedMessages,

    DevtoolsMessages,
    BrowserMessages
}

export default Message
