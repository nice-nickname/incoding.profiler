import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import getColorByAction from "@devtools/utils/actionColors";
import { Actions } from "src/types";
import { LitComponentElement } from "../lit-component";

import styles from "./styles.css"

@customElement('action-marker')
export class ActionMarkerElement extends LitComponentElement {

    static styles = styles

    @property() action: Actions;

    protected render() {
        return html`
            <span class="marker" style="background-color: ${getColorByAction(this.action)};"></span>
            <span class="action">${this.action}</span>
        `;
    }
}
