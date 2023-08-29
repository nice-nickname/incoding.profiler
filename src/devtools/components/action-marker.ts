import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import Actions from "../models/actions";
import getColorByAction from "../utils/actionColors";

const styles = css`
    .marker {
        width: 0.75rem;
        height: 0.75rem;

        border-radius: 1rem;

        display: inline-block;
        vertical-align: middle;

        align-self: center;

        border: 1px solid rgb(212, 212, 212);
    }
`

@customElement('action-marker')
export class ActionMarkerElement extends LitElement {

    static styles = [styles]

    @property() action: Actions;

    render() {
        return html`
            <div>
                <span class="marker" style="
                    background-color: ${getColorByAction(this.action)};"></span>
                ${this.action}
            </div>
        `;
    }
}
