import { ActionMarkerElement } from "../components/action-marker";
import { ProfilerEventElement } from "../components/profiler-event";
import { TimeMarkerElement } from "../components/time-marker";
import { EventListPage } from "../pages/EventList";
import { EventListElement } from "../pages/EventList/panels/event-list";

declare global {

    interface HTMLElementTagNameMap {
        "profiler-event": ProfilerEventElement;
        "action-marker": ActionMarkerElement;
        "time-marker": TimeMarkerElement

        "event-list": EventListElement,
        "event-list-page": EventListPage,
    }

}
