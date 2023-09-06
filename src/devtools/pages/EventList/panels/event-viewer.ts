import '@alenaksu/json-viewer'

import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import JsonData from "../../../models/jsonData";
import { reduxStore } from '../../../slices';

@customElement('event-viewer')
export class EventViewerElement extends LitElement {

    @state() private jsonData: JsonData

    constructor() {
        super()

        reduxStore.subscribe(() => {
            const newJsonData = reduxStore.getState().eventList?.selected?.jsonData
            if (newJsonData) {
                
            }
        })
    }

    render() {
        return html`
            <json-viewer .data=${this.jsonData}></json-viewer>
        `
    }
}
