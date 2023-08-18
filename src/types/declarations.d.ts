import { ActionMarkerElement } from "../devtools/events-panel/profiler-event/action-marker";
import { ProfilerEventElement } from "../devtools/events-panel/profiler-event/profiler-event";

declare global {

    interface HTMLElementTagNameMap {
      "profiler-event": ProfilerEventElement;
      "action-marker": ActionMarkerElement;
    }

  }
