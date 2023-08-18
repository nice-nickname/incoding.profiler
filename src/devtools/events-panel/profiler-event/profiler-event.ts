import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators"

interface ProfilerEventData {
    jsonData: unknown

    action: string
    eventName: string

    self: string[]
    target?: string[]
}



@customElement('profiler-event')
export class ProfilerEventElement extends LitElement {

    @property({ type: Object }) data: ProfilerEventData

    @property({ type: Number }) profiledId: number

    @state() executionTimeMessage: string = 'pending'

    setExecutionTime(timeMs: number) {
        this.executionTimeMessage = `${timeMs.toFixed(2)} ms`
    }

    protected render() {
        return html`
            <action-marker action="${this.data.action}"></action-marker>
            <div>${this.data.action}</div>
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
