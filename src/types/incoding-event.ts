import { Actions } from "./actions"
import { JsonData } from "./json-data"
import { Tag } from "./tag"

export interface IncodingEvent {
    uuid: string
    jsonData: JsonData | null

    action: Actions
    eventName: string

    self: Tag
    target?: Tag[]
    executionTimeMs?: number
}
