import JsonData from "@devtools/models/jsonData"
import Actions from "./actions"

export default interface IncodingEvent {
    uuid: string
    jsonData: JsonData | null

    action: Actions
    eventName: string

    self: string[]
    target?: string[]
    executionTimeMs?: number
}
