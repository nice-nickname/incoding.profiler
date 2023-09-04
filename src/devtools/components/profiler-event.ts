import './action-marker'
import './time-marker'

import { LitElement, css, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js"

import IncodingEvent from '../models/incodingEvent';
import { reduxStore } from '../slices';
import { select } from '../slices/eventList';

const styles = css`
    .event {
        display: flex;
        flex-direction: row;
        gap: 1rem;

        padding: 0.25rem 1rem;

        border-bottom: 1px solid var(--border-color);
    }

    .event:hover {
        background-color: var(--bg-color-highlight);
        cursor: pointer;
    }

    action-marker {
        flex-basis: 100px;
    }

    time-marker {
        flex-basis: 70px;
    }

    .button-group {
        margin-left: auto;
        display: flex;
        gap: 0.5rem;
    }

`

@customElement('profiler-event')
export class ProfilerEventElement extends LitElement {

    static styles = [styles]

    @property({ type: Object }) data: IncodingEvent

    @query('.event') eventElement: HTMLElement;

    render() {
        return html`
            <div class="event">
                <action-marker .action=${this.data.action}></action-marker>
                <time-marker timeInMs="${this.data.executionTimeMs}"></time-marker>
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
        reduxStore.dispatch(select(this.data))
    }
}
