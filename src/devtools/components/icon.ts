import { CSSResultGroup, LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement('m-icon')
export class IconElement extends LitElement {

    static styles = css`
        .material-symbols-outlined {
            font-family: 'Material Symbols Outlined';
            font-weight: normal;
            font-style: normal;
            font-size: 24px;
            line-height: 1;
            letter-spacing: normal;
            text-transform: none;
            display: inline-block;
            white-space: nowrap;
            word-wrap: normal;
            direction: ltr;
            -moz-font-feature-settings: 'liga';
            -moz-osx-font-smoothing: grayscale;

            user-select: none;
        }
    `

    @property() icon: string = ''

    protected render() {
        return html`
            <span class="material-symbols-outlined">
                ${this.icon}
            </span>
        `
    }
}
