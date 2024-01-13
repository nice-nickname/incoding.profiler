import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import Actions from "@devtools/models/actions";
import getColorByAction from "@devtools/utils/actionColors";
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
