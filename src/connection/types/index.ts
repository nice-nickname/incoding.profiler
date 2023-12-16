import {
    IncodingEventMessage,
    IncodingEventExecutedMessage
} from "@devtools/api"


export interface Message<TKey extends string, TPayload = void> {
    type: TKey,
    payload: TPayload
}

export type MessageRegistry =
    IncodingEventMessage |
    IncodingEventExecutedMessage
    ;

export type MessageTypes = MessageRegistry['type']

export type MessageByKey<TKey extends MessageTypes>
    = Extract<MessageRegistry, { type: TKey }>

export type MessagePayload<TKey extends MessageTypes>
    = MessageByKey<TKey>['payload']

export type OnMessageHandler<TKey extends MessageTypes>
    = (payload: MessagePayload<TKey>) => void
