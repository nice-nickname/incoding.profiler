import { LitElement, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import SearchEvent from "./SearchChangeEvent";

import styles from "./styles.css"

@customElement('input-search')
export class InputSearchElement extends LitElement {

    static styles = [styles]

    @property() placeholder: string = ''

    @query('input') searchInput: HTMLInputElement

    protected render() {
        return html`
            <input type="text" placeholder="${this.placeholder}" @keyup=${this.onsearch} />
        `
    }

    private onsearch(ev: KeyboardEvent) {
        const value = this.searchInput.value

        this.dispatchEvent(new SearchEvent(value))
    }
}
