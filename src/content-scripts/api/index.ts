
export type InspectDOMElementMessage = string

type BrowserMessages = {
    'inspect-element': InspectDOMElementMessage
}

export default BrowserMessages
