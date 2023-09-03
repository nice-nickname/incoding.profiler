import { configureStore } from "@reduxjs/toolkit/dist/configureStore";
import eventListReducer from "./eventList";

export const reduxStore = configureStore({
    reducer: {
        eventList: eventListReducer
    }
})

export type RootState = ReturnType<typeof reduxStore.getState>
export type AppDispatch = typeof reduxStore.dispatch
