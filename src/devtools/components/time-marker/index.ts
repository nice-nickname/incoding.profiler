import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement('time-marker')
export class TimeMarkerElement extends LitElement {

    @property({ type: Number })
    public timeInMs?: number | undefined

    protected render() {
        let displayTime = 'pending'

        if (this.timeInMs !== undefined) {
            displayTime = this.formatNumber(this.timeInMs)
        }

        return html`${displayTime}`
    }

    formatNumber(timeInMs: number) {
        const formats: ([limit: number, label: string])[] = [
            [1000, 'ms'],
            [60, 's'],
            [60, 'm'],
            [Infinity, 'h'],
        ]

        let value = timeInMs, units = 'ms'

        for (const [limit, label] of formats) {
            if (value < limit) {
                break
            }

            value /= limit
            units = label
        }

        return `${value.toFixed(2)} ${units}`
    }
}
