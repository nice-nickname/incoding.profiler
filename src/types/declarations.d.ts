import { ActionMarkerElement } from "../devtools/components/action-marker";
import { IconElement } from "../devtools/components/icon";
import { ProfilerEventElement } from "../devtools/components/profiler-event";
import { TimeMarkerElement } from "../devtools/components/time-marker";
import { EventListPage } from "../devtools/pages/EventList";
import { EventListElement } from "../devtools/pages/EventList/panels/event-list";
import { EventListHeaderElement } from "../devtools/pages/EventList/panels/event-list-header";
import { EventViewerElement } from "../devtools/pages/EventList/panels/event-viewer";

declare global {

    interface HTMLElementTagNameMap {
        "profiler-event": ProfilerEventElement;
        "action-marker": ActionMarkerElement;
        "time-marker": TimeMarkerElement;
        "material-icon": IconElement;

        "event-list": EventListElement;
        "event-list-page": EventListPage;
        "event-list-header": EventListHeaderElement;
        "event-viewer": EventViewerElement;
    }

}
