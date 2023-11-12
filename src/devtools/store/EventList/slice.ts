import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import IncodingEvent from "../../models/incodingEvent";
import { IncodingEventExecutedMessage, IncodingEventMessage } from "../../../messages/messages-list";

interface EventListState {
    events: IncodingEvent[],
    eventsPaused: boolean
}

const initialState: EventListState = {
    events: [],
    eventsPaused: false
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
        }
    }
})

export const {
    addEvent,
    updateEvent,
    clearEvents,
    pauseEvents,
    resumeEvents
} = eventListSlice.actions

export default eventListSlice.reducer
