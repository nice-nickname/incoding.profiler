import {
    IncodingEventExecutedMessage,
    IncodingEventMessage
} from "@devtools/api";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { allIncActions } from "@devtools/utils/const";

interface EventListState {
    events: IncodingEvent[],
    eventsPaused: boolean,
    search: string | null,
    incActions: IncodingActions[]
}

const initialState: EventListState = {
    events: [],
    eventsPaused: false,
    search: null,
    incActions: allIncActions
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
        },

        setActions: (state, action: PayloadAction<IncodingActions[]>) => {
            state.incActions = [...action.payload]
        },
        toggleAction: (state, action: PayloadAction<IncodingActions>) => {
            const incAction = action.payload
            const index = state.incActions.indexOf(incAction)

            if (index > -1) {
                state.incActions = state.incActions.toSpliced(index, 1)
            } else {
                state.incActions = [incAction, ...state.incActions]
            }
        },
    }
})

export const {
    addEvent,
    updateEvent,
    clearEvents,
    pauseEvents,
    resumeEvents,
    searchEvents,
    resetSearch,
    setActions,
    toggleAction
} = eventListSlice.actions

export default eventListSlice.reducer
