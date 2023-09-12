import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import IncodingEvent from "../models/incodingEvent";
import { IncodingEventExecutedMessage, IncodingEventMessage } from "../../messages/messages-list";

interface EventListState {
    events: IncodingEvent[]
}

const initialState: EventListState = {
    events: []
}

export const eventListSlice = createSlice({
    name: 'event-list',
    initialState,
    reducers: {
        addEvent: (state, action: PayloadAction<IncodingEventMessage>) => {
            state.events = [...state.events, action.payload]
        },
        updateEvent: (state, action: PayloadAction<IncodingEventExecutedMessage>) => {
            const { uuid, jsonData, executionTimeMs } = action.payload

            const finishedEvent = state.events.find(item => item.uuid === uuid)!
            finishedEvent.jsonData = jsonData
            finishedEvent.executionTimeMs = executionTimeMs

            state.events = [...state.events]
        },
        clearEvents: state => {
            state.events = []
        }
    }
})

export const { addEvent, updateEvent, clearEvents } = eventListSlice.actions

export default eventListSlice.reducer
