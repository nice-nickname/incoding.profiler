import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { styleMap } from 'lit/directives/style-map.js';
import { LitComponentElement } from "../lit-component";

import styles from "./styles.css"

@customElement('material-icon')
export class IconElement extends LitComponentElement {

    static styles = styles

    @property() icon: string = ''

    @property() color?: string

    @property() size: string = '16px'

    protected render() {

        const style = {
            color: this.color,
            fontSize: this.size
        }

        this.style.width = style.fontSize
        this.style.height = style.fontSize

        return html`
            <span class="material-symbols-outlined" style="${styleMap(style)}">
                ${this.icon}
            </span>
        `
    }
}
