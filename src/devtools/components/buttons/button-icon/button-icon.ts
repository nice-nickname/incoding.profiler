import { MaterialIcons } from "@devtools/components/icon/material-icon-name";
import { LitComponentElement } from "@devtools/components/lit-component";
import { Sizing } from "@devtools/components/shared";
import { html } from "lit";
import { customElement, property } from "lit/decorators.js";

import defaultStyles from "../../styles/default-styles.css";
import resetButtonStyles from "../../styles/reset-button.css";
import styles from "./button-icon.css";

@customElement('x-btn-icon')
export class IconButtonElement extends LitComponentElement {

    static styles = [defaultStyles, resetButtonStyles, styles]

    @property() icon: MaterialIcons

    @property() color: string | null


    override connectedCallback() {
        super.connectedCallback()
    }

    protected render() {
        return html`
            <x-btn size="lg">
                <x-icon slot="prefix" icon=${this.icon} .color=${this.color}></x-icon>
            </x-btn>
        `
    }
}
