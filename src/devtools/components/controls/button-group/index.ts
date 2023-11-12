import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('btn-group')
export class ButtonGroupElement extends LitElement {

    static styles = css`
        :host {
            display: flex;

            gap: 0.25rem;
        }
    `

    protected render() {
        return html`
            <slot></slot>
        `
    }
}
