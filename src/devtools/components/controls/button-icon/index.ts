import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import styles from "./styles.css"
import resetButtonStyles from "../../../styles/reset-button.css"
import ButtonClickEvent from "./ButtonClickEvent";

@customElement('btn-icon')
export class IconButtonElement extends LitElement {

    static styles = [styles, resetButtonStyles]

    @property() icon: string

    @property() color?: string

    constructor() {
        super()
    }

    protected render() {
        return html`
            <button title="${this.title}">
                <material-icon .icon=${this.icon} .color=${this.color}></material-icon>
            </button>
        `
    }

    private dispatchChange() {
        this.dispatchEvent(new ButtonClickEvent())
    }
}
