import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";


@customElement('action-marker')
export class ActionMarkerElement extends LitElement {

    @property() action: string;

    render() {
        return html`
            <div>${this.action}</div>
        `;
    }
}
