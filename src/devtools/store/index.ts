import { configureStore } from "@reduxjs/toolkit";
import eventListReducer from "./event-list/slice";
import eventViewerReducer from "./event-viewer/slice";

const store = configureStore({
    reducer: {
        eventList: eventListReducer,
        eventViewer: eventViewerReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export default store
