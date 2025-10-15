import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { LitComponentElement } from "../lit-component";

import defaultStyles from "../styles/default-styles.css";


@customElement('time-format')
export class TimeFormatElement extends LitComponentElement {

    static styles = [defaultStyles]

    @property({ type: Number }) timeInMs?: number | undefined

    protected render() {
        return this.timeInMs !== undefined
            ? this.formatNumber(this.timeInMs)
            : 'pending'
    }

    private formatNumber(ms: number) {
        const formats = [
            { limit: 1000, label: 'ms', title: 'milliseconds' },
            { limit: 60, label: 's', title: 'seconds' },
            { limit: 60, label: 'min', title: 'minutes' },
            { limit: Infinity, label: 'h', title: 'hours' }
        ]

        let value = ms
        let format = formats[0]

        for (const nextFormat of formats) {
            format = nextFormat

            if (value < nextFormat.limit) {
                break
            }

            value /= nextFormat.limit
        }

        const valueStr = value.toFixed(2)
        const { label, title } = format

        return html`<span title="${valueStr} ${title}">${valueStr} ${label}</span>`
    }
}
