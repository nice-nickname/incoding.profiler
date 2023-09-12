import { configureStore } from "@reduxjs/toolkit";
import eventListReducer from "../slices/eventList";
import eventViewerReducer from "../slices/eventViewer";

const store = configureStore({
    reducer: {
        eventList: eventListReducer,
        eventViewer: eventViewerReducer
    }
})

export default store
