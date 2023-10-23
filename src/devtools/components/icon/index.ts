import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import styles from "./styles.css"

@customElement('m-icon')
export class IconElement extends LitElement {

    static styles = styles

    @property() icon: string = ''

    protected render() {
        return html`
            <span class="material-symbols-outlined">
                ${this.icon}
            </span>
        `
    }
}
