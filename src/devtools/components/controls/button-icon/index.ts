import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import resetButtonStyles from "@devtools/styles/reset-button.css"
import ButtonClickEvent from "./ButtonClickEvent";

@customElement('btn-icon')
export class IconButtonElement extends LitElement {

    static styles = [resetButtonStyles]

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

    private dispatchChange() {
        this.dispatchEvent(new ButtonClickEvent())
    }
}
