import IncodingEvent from "@devtools/models/incodingEvent"

export type IncodingEventMessage =
    Omit<IncodingEvent, 'executionTimeMs'>

export type IncodingEventExecutedMessage =
    Pick<IncodingEvent, 'uuid' | 'jsonData' | 'executionTimeMs'>

type DevtoolsMessages =  {
    'event-execution-start': IncodingEventMessage
    'event-execution-finish': IncodingEventExecutedMessage
}

export default DevtoolsMessages
