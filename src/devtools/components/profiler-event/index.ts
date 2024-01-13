import { html } from "lit";
import { customElement, property, query } from "lit/decorators.js"
import IncodingEvent from '@devtools/models/incodingEvent';
import { LitComponentElement } from "../lit-component";

import styles from "./styles.css"



@customElement('profiler-event')
export class ProfilerEventElement extends LitComponentElement {

    static styles = styles

    @property({ type: Object }) data: IncodingEvent

    @query('.event') eventElement: HTMLElement;

    protected render() {
        return html`
            <div class="event" @click="${this.handleClick}">
                <action-marker .action=${this.data.action}></action-marker>
                <time-marker .timeInMs=${this.data.executionTimeMs}></time-marker>
                <div>${this.data.eventName}</div>
            </div>
        `
    }

    private handleClick() {
        this.fireEvent('data-selected', this.data)
    }
}
