declare interface Tag {
    tagName: string
    classes: string[]
    id: string,

    profilerId: string
}

declare type IncodingActions =
    'Direct' |
    'Eval' |
    'Ajax' |
    'Submit' |
    'Jquery' |
    'Trigger' |
    'Insert' |
    'Eval Method' |
    'Break' |
    'Store Insert' |
    'Store fetch' |
    'Store Manipulate' |
    'Form' |
    'Bind' |
    'Validation parse' |
    'Validation Refresh'

declare interface IncodingEvent {
    uuid: string
    jsonData: JsonData | null

    action: IncodingActions
    eventName: string

    self: Tag
    target?: Tag[]
    executionTimeMs?: number
}
