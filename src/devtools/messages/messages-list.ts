import JsonData from "../models/jsonData"

export interface IncodingEventMessage {
    uuid: string
    jsonData: JsonData

    action: string
    eventName: string

    self: string[]
    target?: string[]
}

export interface IncodingEventExecutedMessage {
    uuid: string
    executionTimeMs: number
    jsonData: JsonData
}
