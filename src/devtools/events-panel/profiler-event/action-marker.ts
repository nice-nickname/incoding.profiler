import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators";


@customElement('action-marker')
export class ActionMarkerElement extends LitElement {

    @property()
    public action: string;

    protected render() {
        return html`
            <div data-action="${this.action}"></div>
        `;
    }
}
