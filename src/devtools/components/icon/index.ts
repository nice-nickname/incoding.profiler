import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { styleMap } from 'lit/directives/style-map.js';

import styles from "./styles.css"

@customElement('material-icon')
export class IconElement extends LitElement {

    static styles = styles

    @property() icon: string = ''

    @property() color?: string

    @property() size: string = '16px'

    protected render() {

        this.style.width = this.size
        this.style.height = this.size

        const style = {
            color: this.color,
            fontSize: this.size
        }

        return html`
            <span class="material-symbols-outlined" style="${styleMap(style)}">
                ${this.icon}
            </span>
        `
    }
}
