import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { LitComponentElement } from "../lit-component";


import defaultStyles from "../styles/default-styles.css";
import styles from "./dropdown-menu.css";


@customElement('x-dropdown-menu')
export class DropdownMenuElement extends LitComponentElement {

    static styles = [defaultStyles, styles]

    protected render() {
        return html`
            <div class="menu">
                <slot></slot>
            </div>
        `;
    }
}
