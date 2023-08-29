import IncodingEvent from "../models/incodingEvent"

export type IncodingEventMessage = Omit<IncodingEvent, 'executionTimeMs'>

export type IncodingEventExecutedMessage = Pick<IncodingEvent, 'uuid' | 'jsonData' | 'executionTimeMs'>
