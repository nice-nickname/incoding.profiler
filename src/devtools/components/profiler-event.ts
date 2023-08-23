import './action-marker'

import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js"
import { IncodingEventMessage } from "../messages/messages-list";


@customElement('profiler-event')
export class ProfilerEventElement extends LitElement {

    @property({ type: Object }) data: IncodingEventMessage

    @state() private executionTimeMessage: string = 'pending'

    set executionTime(timeMs: number) {
        this.executionTimeMessage = `${timeMs.toFixed(2)} ms`
    }

    render() {
        return html`
            <action-marker action="${this.data.action}"></action-marker>
            <div>${this.data.eventName}</div>
            <div>${this.executionTimeMessage}</div>
            <div>
                <button @click=${this._setJsonData}>jsonData</button>
                <button>self</button>
                <button>target</button>
            </div>
        `
    }

    _setJsonData() {

    }

    _inspectSelf() {

    }
}
