import { createSelector } from "@reduxjs/toolkit";
import { IncodingEvent } from "src/types";
import { RootState } from "..";

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


export { selectEvents };
