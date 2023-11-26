import '@alenaksu/json-viewer'

import { html } from "lit";
import { customElement, state } from "lit/decorators.js";
import JsonData from "@devtools/models/jsonData"
import { RootState } from '@devtools/store';
import StatefulLitElement from '@devtools/core/StatefulLItElement';


@customElement('event-viewer')
export class EventViewerElement extends StatefulLitElement {

    @state() private jsonData: JsonData

    protected onStateChanged(state: RootState): void {
        const selectedEvent = state.eventViewer.selected

        if (selectedEvent && selectedEvent.jsonData) {
            this.jsonData = selectedEvent.jsonData
        }
    }

    protected render() {
        return html`
            <json-viewer .data=${this.jsonData}></json-viewer>
        `
    }
}
