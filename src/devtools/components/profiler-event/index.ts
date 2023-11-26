import { LitElement, html } from "lit";
import { customElement, property, query } from "lit/decorators.js"
import IncodingEvent from '@devtools/models/incodingEvent';
import { select } from '@devtools/store/EventViewer/slice';
import store from '@devtools/store';

import styles from "./styles.css"

@customElement('profiler-event')
export class ProfilerEventElement extends LitElement {

    static styles = styles

    @property({ type: Object }) data: IncodingEvent

    @query('.event') eventElement: HTMLElement;

    protected render() {
        return html`
            <div class="event" @click="${this._click}">
                <action-marker .action=${this.data.action}></action-marker>
                <time-marker .timeInMs=${this.data.executionTimeMs}></time-marker>
                <div>${this.data.eventName}</div>
            </div>
        `
    }

    _click() {
        store.dispatch(select(this.data))
    }
}
