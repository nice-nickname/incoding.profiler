import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import styles from "./styles.css"

@customElement('material-icon')
export class IconElement extends LitElement {

    static styles = styles

    @property() icon: string = ''

    @property() color?: string

    protected render() {
        const colorStyle = this.color ? `color: ${this.color};` : ``

        return html`
            <span class="material-symbols-outlined" style="${colorStyle}">
                ${this.icon}
            </span>
        `
    }
}
