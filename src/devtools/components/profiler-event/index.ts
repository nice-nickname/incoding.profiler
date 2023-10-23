import { LitElement, html } from "lit";
import { customElement, property, query } from "lit/decorators.js"
import IncodingEvent from '../../models/incodingEvent';
import { select } from '../../store/EventViewer/slice';
import store from '../../store';

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
                <time-marker timeInMs="${this.data.executionTimeMs!}"></time-marker>
                <div>${this.data.eventName}</div>
                <div class="button-group">
                    <button>jsonData</button>
                    <button>self</button>
                    <button>target</button>
                </div>
            </div>
        `
    }

    _click() {
        store.dispatch(select(this.data))
    }
}
