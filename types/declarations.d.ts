import { ActionMarkerElement } from "../src/devtools/components/action-marker";
import { ProfilerEventElement } from "../src/devtools/components/profiler-event";
import { TimeMarkerElement } from "../src/devtools/components/time-marker";
import { EventListPage } from "../src/devtools/pages/EventList";
import { EventListElement } from "../src/devtools/pages/EventList/panels/event-list";

declare global {

    interface HTMLElementTagNameMap {
      "profiler-event": ProfilerEventElement;
      "action-marker": ActionMarkerElement;
      "time-marker": TimeMarkerElement

      "event-list": EventListElement,
      "event-list-page": EventListPage,
    }

  }
