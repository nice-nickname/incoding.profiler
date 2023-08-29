import JsonData from "../models/jsonData"
import Actions from "./actions"

export default interface IncodingEvent {
    uuid: string
    jsonData: JsonData

    action: Actions
    eventName: string

    self: string[]
    target?: string[]
    executionTimeMs?: number
}
