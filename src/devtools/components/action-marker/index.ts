import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import Actions from "../../models/actions";
import getColorByAction from "../../utils/actionColors";

import styles from "./styles.css"

@customElement('action-marker')
export class ActionMarkerElement extends LitElement {

    static styles = styles

    @property() action: Actions;

    protected render() {
        return html`
            <span class="marker" style="background-color: ${getColorByAction(this.action)};"></span>
            <span class="action">${this.action}</span>
        `;
    }
}
