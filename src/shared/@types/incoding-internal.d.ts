declare type IncSelector = string

declare type IncConditionalTypes = 'Is' | 'Eval' | 'DataIsId' | 'Data'

declare interface IncodingConditional {
    type: IncConditionalTypes,
    left: IncSelector,
    right: IncSelector,
    method: string,

    inverse: boolean,
    and: boolean
}

declare enum IncodingEventStatus {
    None = 1,

    PreventDefault,

    StopPropagation,

    All
}

declare enum IncodingCallbackType {
    Begin = 1,

    Success,

    Error,

    Complete,

    Break
}
