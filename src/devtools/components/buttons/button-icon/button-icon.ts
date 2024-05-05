import { MaterialIconName } from "@devtools/components/icon/material-icon-name";
import { MaterialIconSize } from "@devtools/components/icon/material-icon-size";
import { LitComponentElement } from "@devtools/components/lit-component";
import { html } from "lit";
import { customElement, property } from "lit/decorators.js";

import defaultStyles from "../../styles/default-styles.css";
import resetButtonStyles from "../../styles/reset-button.css";
import styles from "./button-icon.css";

@customElement('btn-icon')
export class IconButtonElement extends LitComponentElement {

    static styles = [defaultStyles, resetButtonStyles, styles]

    @property() icon: MaterialIconName

    @property() size: MaterialIconSize = 'md'

    @property() color?: string


    constructor() {
        super()

        this.style.height = `var(--size-${this.size})`
    }

    protected render() {
        return html`
            <button title="${this.title}">
                <material-icon .icon=${this.icon} .color=${this.color} size=${this.size}></material-icon>
            </button>
        `
    }
}
