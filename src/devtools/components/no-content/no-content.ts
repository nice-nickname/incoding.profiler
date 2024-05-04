import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement('no-content')
export class NoContentPlaceholderElement extends LitElement {

    static styles = css`
        :host {
            display: flex;
            justify-content: center;
            align-items: center;

            height: 100%;
            width: 100%;
        }
    `

    @property() text: string = ''

    protected render() {
        return html`
            <span>${this.text}</span>
        `
    }
}
