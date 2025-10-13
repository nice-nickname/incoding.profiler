import { css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { LitComponentElement } from "../lit-component";

import defaultStyles from "../styles/default-styles.css";


@customElement('x-dropdown-divider')
export class DropdownMenuItemElement extends LitComponentElement {

    static styles = [defaultStyles, css`
        .divider {
            width: 100%;
            height: 1px;
            background: var(--border-panel-color);
        }
    `]

    protected render() {
        return html`
            <div class="divider"></div>
        `;
    }
}
