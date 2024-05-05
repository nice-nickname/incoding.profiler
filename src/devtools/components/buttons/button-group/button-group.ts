import { LitComponentElement } from "@devtools/components/lit-component";
import { html } from "lit";
import { customElement } from "lit/decorators.js";

import defaultStyles from "../../styles/default-styles.css";
import styles from "./button-group.css";

@customElement('btn-group')
export class ButtonGroupElement extends LitComponentElement {

    static styles = [defaultStyles, styles]

    protected render() {
        return html`
            <slot></slot>
        `
    }
}
