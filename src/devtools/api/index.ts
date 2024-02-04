import IncodingEvent from "@devtools/types/incoding-event"

export type IncodingEventMessage =
    Omit<IncodingEvent, 'executionTimeMs'>

export type IncodingEventExecutedMessage =
    Pick<IncodingEvent, 'uuid' | 'jsonData' | 'executionTimeMs'>

export type RefreshMessage = void

type DevtoolsMessages =  {
    'event-execution-start': IncodingEventMessage
    'event-execution-finish': IncodingEventExecutedMessage
    'refresh': RefreshMessage
}

export default DevtoolsMessages
