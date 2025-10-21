import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { LitComponentElement } from "../lit-component";

import defaultStyles from "../styles/default-styles.css";


@customElement('date-format')
export class DateFormatElement extends LitComponentElement {

    static styles = [defaultStyles]

    @property({ attribute: false }) value?: Date | number

    private formatter = new Intl.DateTimeFormat(undefined, {
        dateStyle: 'medium'
    })

    protected render() {
        return html`
            <span>
                ${this.formatter.format(this.value)}
            </span>
        `
    }
}
