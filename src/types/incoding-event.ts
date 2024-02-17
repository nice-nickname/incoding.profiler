import { Actions } from "./actions"
import { JsonData } from "./json-data"


export interface IncodingEvent {
    uuid: string
    jsonData: JsonData | null

    action: Actions
    eventName: string

    self: string[]
    target?: string[]
    executionTimeMs?: number
}
