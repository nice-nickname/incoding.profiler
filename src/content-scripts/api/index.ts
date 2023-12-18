
export type InspectDOMElementMessage = string

export type InspecDomElementsMessage = string[]

type BrowserMessages = {
    'inspect-element': InspectDOMElementMessage,
    'inspect-elements': InspecDomElementsMessage
}

export default BrowserMessages
