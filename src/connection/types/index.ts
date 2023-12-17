import type DevtoolsMessages from "@devtools/api"
import type BrowserMessages from "@content-scripts/api"

type Message<TMessages> = {
    type: keyof TMessages,
    payload: TMessages[keyof TMessages]
}

export {
    DevtoolsMessages,
    BrowserMessages
}

export default Message
