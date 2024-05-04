import { LitComponentElement } from "@devtools/components/lit-component";
import resetButtonStyles from "@devtools/styles/reset-button.css";
import { html } from "lit";
import { customElement, property } from "lit/decorators.js";

import styles from "./button-icon.css";

@customElement('btn-icon')
export class IconButtonElement extends LitComponentElement {

    static styles = [resetButtonStyles, styles]

    @property() icon: string

    @property() color?: string

    private size = '20px'

    constructor() {
        super()

        this.style.width = this.size
        this.style.height = this.size
    }

    protected render() {
        return html`
            <button title="${this.title}">
                <material-icon .icon=${this.icon} .color=${this.color} size="${this.size}"></material-icon>
            </button>
        `
    }
}
