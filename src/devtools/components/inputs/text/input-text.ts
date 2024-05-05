import { LitComponentElement } from "@devtools/components/lit-component";
import { html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { live } from "lit/directives/live.js";

import defaultStyles from "../../styles/default-styles.css"
import styles from "./input-text.css";

export type ValueChangeEventDetail = {
    search: string
}


@customElement('input-text')
export class InputSearchElement extends LitComponentElement {

    static styles = [defaultStyles, styles]

    @property() placeholder: string = ''

    @property({ type: Number }) delayMs: number = 100

    @property() value: string = ''

    @query('input') input: HTMLInputElement

    protected render() {
        return html`
            <input type="text"
                .placeholder=${this.placeholder}
                .value=${live(this.value)}
                @input=${this.handleInput}
                @keyup=${this.handleSearch} />
        `
    }

    private handleInput() {
        this.value = this.input.value
    }

    private handleSearch() {
        this.fireEvent('value-change', {
            search: this.value
        })
    }
}
