import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import JsonData from "../../../models/jsonData";

@customElement('event-viewer')
export class EventViewerElement extends LitElement {

    @property({ type: Object }) jsonData: JsonData

    render() {
        return html`
            <json-viewer .data=${this.jsonData}></json-viewer>
        `
    }
}
