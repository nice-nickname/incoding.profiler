import { html, PropertyValues } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { LitComponentElement } from "../lit-component";

import defaultStyles from "../styles/default-styles.css";
import styles from "./dropdown.css";


@customElement('x-dropdown')
export class DropdownElement extends LitComponentElement {

    static styles = [defaultStyles, styles]

    @state() private isOpen: boolean = false


    @query('.dropdown') private dropdown: HTMLElement

    @query('.dropdown__menu') private menu: HTMLElement

    override connectedCallback() {
        super.connectedCallback()
        document.addEventListener('click', this.handleGlobalClick)
    }

    override disconnectedCallback() {
        super.disconnectedCallback()
        document.removeEventListener('click', this.handleGlobalClick)
    }

    protected override updated(changes: PropertyValues) {
        if (this.dropdown && this.menu) {
            const position = this.dropdown.getBoundingClientRect()
            this.menu.style.top = position.bottom + 'px'
            this.menu.style.left = position.left + 'px'
        }
    }

    protected render() {
        const position = this.dropdown?.getBoundingClientRect()
        const positionCss = styleMap({
            top: position?.bottom,
            left: position?.left
        })

        return html`
            <div class="dropdown">
                <slot class="dropdown__button" name="trigger" @click=${this.handleClick}></slot>
                <slot class="dropdown__menu" ?open=${this.isOpen} style=${positionCss}></slot>
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
