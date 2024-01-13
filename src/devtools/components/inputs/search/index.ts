import { html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { live } from "lit/directives/live.js"
import { LitComponentElement } from "@devtools/components/lit-component";

import styles from "./styles.css"

export type SearchEventDetail = {
    search: string
}

@customElement('input-search')
export class InputSearchElement extends LitComponentElement {

    static styles = [styles]

    @property() placeholder: string = ''

    @property({ type: Number }) delayMs: number = 100

    @property() searchValue: string = ''

    @query('input') input: HTMLInputElement

    protected render() {
        return html`
            <input type="text"
                .placeholder=${this.placeholder}
                .value=${live(this.searchValue)}
                @input=${this.handleInput}
                @keyup=${this.handleSearch} />
        `
    }

    private handleInput() {
        this.searchValue = this.input.value
    }

    private handleSearch() {
        this.fireEvent('search', {
            search: this.searchValue
        })
    }
}
