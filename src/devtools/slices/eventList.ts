import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import IncodingEvent from "../models/incodingEvent";
import { IncodingEventExecutedMessage, IncodingEventMessage } from "../../messages/messages-list";

interface EventListState {
    events: IncodingEvent[]
    selected: IncodingEvent | null
}

const initialState: EventListState = {
    events: [],
    selected: null
}

export const eventListSlice = createSlice({
    name: 'event-list',
    initialState,
    reducers: {
        push: (state, action: PayloadAction<IncodingEventMessage>) => {
            state.events = [...state.events, action.payload]
        },
        update: (state, action: PayloadAction<IncodingEventExecutedMessage>) => {
            const { uuid, jsonData, executionTimeMs } = action.payload

            const finishedEvent = state.events.find(item => item.uuid === uuid)!
            finishedEvent.jsonData = jsonData
            finishedEvent.executionTimeMs = executionTimeMs

            state.events = [...state.events]
        },
        clear: state => {
            state.events = []
        },

        select: (state, action: PayloadAction<IncodingEvent>) => {
            state.selected = action.payload
        },
        unselect: state => {
            state.selected = null
        }
    }
})

export const { push, update, clear, select, unselect } = eventListSlice.actions

export default eventListSlice.reducer
