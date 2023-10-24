import { RootState } from "..";

const selectEvents = (state: RootState) => state.eventList.events

export { selectEvents }
