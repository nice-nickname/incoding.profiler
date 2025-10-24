import '@alenaksu/json-viewer';
import StatefulLitElement from '@devtools/pages/stateful-lit-component';
import resources from '@devtools/resources';
import { RootState } from '@devtools/store';
import { selectSelectedJsonData } from '@devtools/store/event-viewer/selectors';
import { html } from "lit";
import { customElement, state } from "lit/decorators.js";

import defaultStyles from "../../../components/styles/default-styles.css";
import styles from "./event-viewer.css";


@customElement('event-viewer')
export class EventViewerElement extends StatefulLitElement {

    @state() private selectedEvent: IncodingEvent | null = null

    static styles = [defaultStyles, styles]

    protected onStateChanged(state: RootState): void {
        this.selectedEvent = selectSelectedJsonData(state)
    }

    protected render() {
        return html`
            ${this.selectedEvent !== null
                ? this.renderContent()
                : this.renderEmpty()
            }`
    }

    private renderEmpty() {
        return html`<no-content text=${resources.no_selected_item}></no-content>`
    }

    private renderContent() {
        const incoding = this.selectedEvent!
        const targets = incoding.target || []

        return html`
            <div class="list">
                <div class="property">
                    <span>self:</span> <tag-link .tag=${incoding.self}></tag-link>
                </div>

                ${targets.map((tag, i) => html`
                    <span>${i}:</span> <tag-link .tag=${tag}></tag-link>
                `)}

                <json-viewer .data=${incoding.jsonData}></json-viewer>
            </div>
        `
    }
}
