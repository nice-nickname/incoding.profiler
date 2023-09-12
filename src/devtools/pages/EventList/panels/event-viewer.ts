import '@alenaksu/json-viewer'

import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import JsonData from "../../../models/jsonData";
import store from '../../../store';


@customElement('event-viewer')
export class EventViewerElement extends LitElement {

    @state() private jsonData: JsonData

    constructor() {
        super()

        store.subscribe(() => {
            const selectedEvent = store.getState().eventViewer.selected
            if (selectedEvent && selectedEvent.jsonData) {
                this.jsonData = selectedEvent.jsonData
            }
        })
    }

    render() {
        return html`
            <json-viewer .data=${this.jsonData}></json-viewer>
        `
    }
}
