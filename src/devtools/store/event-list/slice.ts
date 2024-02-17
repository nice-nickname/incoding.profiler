import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
    IncodingEventExecutedMessage,
    IncodingEventMessage
} from "@devtools/api";
import {
    IncodingEvent
} from "src/types";

interface EventListState {
    events: IncodingEvent[],
    eventsPaused: boolean,
    search: string | null
}

const initialState: EventListState = {
    events: [],
    eventsPaused: false,
    search: null
}

export const eventListSlice = createSlice({
    name: 'event-list',
    initialState,
    reducers: {
        addEvent: (state, action: PayloadAction<IncodingEventMessage>) => {
            if (state.eventsPaused) {
                return
            }

            state.events = [...state.events, action.payload]
        },
        updateEvent: (state, action: PayloadAction<IncodingEventExecutedMessage>) => {
            if (state.eventsPaused) {
                return
            }

            const { uuid, jsonData, executionTimeMs } = action.payload

            const finishedEvent = state.events.find(item => item.uuid === uuid)!
            finishedEvent.jsonData = jsonData
            finishedEvent.executionTimeMs = executionTimeMs

            state.events = [...state.events]
        },
        clearEvents: state => {
            state.events = []
        },

        pauseEvents: state => {
            state.eventsPaused = true
        },
        resumeEvents: state => {
            state.eventsPaused = false
        },

        resetSearch: state => {
            state.search = null
        },
        searchEvents: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        }
    }
})

export const {
    addEvent,
    updateEvent,
    clearEvents,
    pauseEvents,
    resumeEvents,
    searchEvents,
    resetSearch
} = eventListSlice.actions

export default eventListSlice.reducer
