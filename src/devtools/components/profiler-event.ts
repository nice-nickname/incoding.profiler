import './action-marker'

import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js"

import IncodingEvent from '../models/incodingEvent';

const styles = css`
    .event {
        display: flex;
        flex-direction: row;
        gap: 1rem;

        padding: 0.25rem 1rem;

        border-bottom: 1px solid var(--border-color);
    }

    .button-group {
        margin-left: auto;
        display: flex;
        gap: 0.5rem;
    }

`

@customElement('profiler-event')
export class ProfilerEventElement extends LitElement {

    @property({ type: Object }) data: IncodingEvent

    render() {
        let executionTimeMessage = 'pending'

        if (this.data.executionTimeMs !== undefined) {
            executionTimeMessage = this.data.executionTimeMs.toFixed(2)
        }

        return html`
            <div>
                <action-marker .action=${this.data.action}></action-marker>
                <div>${this.data.eventName}</div>
                <div>${executionTimeMessage}</div>
                <div class="button-group">
                    <button>jsonData</button>
                    <button>self</button>
                    <button>target</button>
                </div>
            </div>
        `
    }
}
