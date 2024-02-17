import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IncodingEvent } from "src/types";

interface EventViewerState {
    selected: IncodingEvent | null
}

const initialState: EventViewerState = {
    selected: null
}

export const eventViewerSlice = createSlice({
    name: 'event-viewer',
    initialState,
    reducers: {
        select: (state, action: PayloadAction<IncodingEvent>) => {
            // state.selected = action.payload
        },
        unselect: (state) => {
            state.selected = null
        }
    }
})

export const { select, unselect } = eventViewerSlice.actions

export default eventViewerSlice.reducer
