import { configureStore } from "@reduxjs/toolkit";
import eventListReducer from "./EventList/slice";
import eventViewerReducer from "./EventViewer/slice";

const store = configureStore({
    reducer: {
        eventList: eventListReducer,
        eventViewer: eventViewerReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export default store
