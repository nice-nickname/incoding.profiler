import { css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { LitComponentElement } from "../lit-component";

import defaultStyles from "../styles/default-styles.css";


@customElement('x-dropdown-menu-item')
export class DropdownMenuItemElement extends LitComponentElement {

    static styles = [defaultStyles, css`
        .item {
            padding: 0 0.25rem;
        }
    `]

    protected render() {
        return html`
            <div class="item">
                <slot></slot>
            </div>
        `;
    }
}
