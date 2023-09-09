import { configureStore } from "@reduxjs/toolkit";
import eventListReducer from "../slices/eventList";

const store = configureStore({
    reducer: {
        eventList: eventListReducer
    }
})

export default store
