import { LitComponentElement } from "@devtools/components/lit-component";
import { html } from "lit";
import { customElement, property } from "lit/decorators.js";

import defaultStyles from "@devtools/components/styles/default-styles.css";
import styles from "./incoding-event.css";


@customElement('incoding-event')
export class ProfilerEventElement extends LitComponentElement {

    static styles = [defaultStyles, styles]

    @property({ attribute: false }) data: IncodingEvent

    protected render() {
        return html`
            <div class="event" @click="${this.handleClick}">
                <action-marker .action=${this.data.action}></action-marker>
                <time-format .timeInMs=${this.data.executionTimeMs}></time-format>
                <div>${this.data.eventName}</div>

                <tag-link .tag=${this.data.self}></tag-link>
            </div>
        `
    }

    private handleClick() {
        this.fireEvent('event-selected', this.data)
    }
}
