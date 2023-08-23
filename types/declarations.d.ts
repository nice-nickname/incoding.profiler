import { ActionMarkerElement } from "../src/devtools/components/action-marker";
import { ProfilerEventElement } from "../src/devtools/components/profiler-event";

declare global {

    interface HTMLElementTagNameMap {
      "profiler-event": ProfilerEventElement;
      "action-marker": ActionMarkerElement;
    }

  }
