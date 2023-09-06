import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement('time-marker')
export class TimeMarkerElement extends LitElement {

    @property({ type: Number })
    public timeInMs?: number | undefined

    render() {
        let displayTime = 'pending'

        if (this.timeInMs !== undefined) {
            displayTime = this.timeInMs.toFixed(2) + ' ms'
        }

        return html`${displayTime}`
    }
}
