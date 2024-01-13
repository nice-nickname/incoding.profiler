import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import IncodingEvent from "@devtools/types/incoding-event";

const eventsSelector = (state: RootState) => state.eventList.events
const searchSelector = (state: RootState) => state.eventList.search

const selectEvents = createSelector([eventsSelector, searchSelector],
    (events, search) => {
        if (search === null) {
            return events
        }

        const predicate = (event: IncodingEvent) => {
            return event.action.includes(search) ||
                event.eventName.includes(search)
        }

        return events.filter(predicate)
    })


export { selectEvents }
