import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import resetButtonStyles from "@devtools/styles/reset-button.css"
import { LitComponentElement } from "@devtools/components/lit-component";

@customElement('btn-icon')
export class IconButtonElement extends LitComponentElement {

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
}
