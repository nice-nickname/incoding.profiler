import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";

const eventsSelector = (state: RootState) => state.eventList.events
const searchSelector = (state: RootState) => state.eventList.search
const actionsSelector = (state: RootState) => state.eventList.incActions

const selectEvents = createSelector([eventsSelector, searchSelector, actionsSelector],
    (events, search, actions) => {
        const byActions = (event: IncodingEvent) => actions.length === 0 || actions.includes(event.action)
        const bySearch = (event: IncodingEvent) => search === null || event.action.includes(search) || event.eventName.includes(search)

        return events.filter(incEvent => byActions(incEvent) && bySearch(incEvent))
    }
)

const eventsListSelector = (state: RootState) => state.eventList

const selectIsEventsPaused = createSelector([eventsListSelector],
    (events) => events.eventsPaused
)

const selectEventsSearch = createSelector([eventsListSelector],
    (events) => events.search
)

const selectActions = createSelector([eventsListSelector],
    (events) => events.incActions
)


export {
    selectEvents,
    selectIsEventsPaused,
    selectEventsSearch,
    selectActions
};
