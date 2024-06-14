import getColorByAction from "@devtools/utils/actionColors";
import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { LitComponentElement } from "../lit-component";

import defaultStyles from "../styles/default-styles.css";
import styles from "./action-marker.css";

@customElement('action-marker')
export class ActionMarkerElement extends LitComponentElement {

    static styles = [defaultStyles, styles]

    @property() action: IncodingActions;

    protected render() {
        return html`
            <span class="marker" style="background-color: ${getColorByAction(this.action)};"></span>
            <span class="action">${this.action}</span>
        `;
    }
}
