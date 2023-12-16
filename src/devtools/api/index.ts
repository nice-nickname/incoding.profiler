import IncodingEvent from "@devtools/models/incodingEvent"
import { Message } from "src/connection/types"

export type IncodingEventMessage = Message<
    'event-execution-start',
    Omit<IncodingEvent, 'executionTimeMs'>
>

export type IncodingEventExecutedMessage = Message<
    'event-execution-finish',
    Pick<IncodingEvent, 'uuid' | 'jsonData' | 'executionTimeMs'>
>
