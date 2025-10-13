import { html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { createRef, Ref, ref } from "lit/directives/ref.js";
import { LitComponentElement } from "../lit-component";


import defaultStyles from "../styles/default-styles.css";
import styles from "./dropdown.css";


@customElement('x-dropdown')
export class DropdownElement extends LitComponentElement {

    static styles = [defaultStyles, styles]

    @state() private isOpen: boolean = false

    override connectedCallback() {
        super.connectedCallback()
        document.addEventListener('click', this.handleGlobalClick)
    }

    override disconnectedCallback() {
        super.disconnectedCallback()
        document.removeEventListener('click', this.handleGlobalClick)
    }

    protected render() {
        return html`
            <div class="dropdown">
                <slot class="dropdown__button" name="trigger" @click=${this.handleClick}></slot>
                <slot class="dropdown__menu ${this.isOpen ? 'show' : ''}" @click=${() => false}></slot>
            </div>
        `;
    }

    private handleClick = () => {
        this.isOpen = !this.isOpen
    }

    private handleGlobalClick = (ev: MouseEvent) => {
        if (this.isOpen && this.isClickedOutside(ev)) {
            this.isOpen = false
        }
    }

    private isClickedOutside(ev: MouseEvent) {
        const path = ev.composedPath()

        for (let i = path.length - 1; i >= 0; i--) {
            const el = path[i]

            if (el === this) {
                return false
            }
        }

        return true
    }
}
