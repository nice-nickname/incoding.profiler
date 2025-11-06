export type IncodingEventMessage = Omit<IncodingEvent, 'executionTimeMs'>

export type IncodingEventExecutedMessage = Pick<IncodingEvent, 'uuid' | 'jsonData' | 'executionTimeMs'>

type DevtoolsMessages =  {
    'event-execution:start': IncodingEventMessage
    'event-execution:finish': IncodingEventExecutedMessage
    'refresh': void
}

export default DevtoolsMessages
