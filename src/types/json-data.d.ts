
declare type JsonData = {
    /**
     * Original bind of element
     */
    onBind: string,

    /**
     * Event status, indicating preventDefault, stopPropagation calls...
     */
    onEventStatus: IncodingEventStatus,

    /**
     * Type of bind (OnSuccess, OnBegin)
     */
    onStatus: IncodingCallbackType

    /**
     *  Conditional elements
     */
    ands?: IncodingConditional[]
}


declare type AjaxJsonData = {
    ajax: Object

    hash: boolean

    prefix: string
} & JsonData
