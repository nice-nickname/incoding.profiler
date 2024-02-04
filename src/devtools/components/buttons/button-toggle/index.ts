import { html } from "lit";
import { customElement, property, queryAssignedElements, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js"
import { LitComponentElement } from "@devtools/components/lit-component";

import styles from "./styles.css"

export type ToggleEventDetails = {
    disabled: boolean
}

@customElement('btn-toggle')
export class ButtonToggleElement extends LitComponentElement {

    static styles = [styles]

    @property({ type: Boolean }) disabled: boolean = false

    protected render() {
        return html`
            <slot class=${classMap({ hidden: this.disabled })} name="enabled"></slot>
            <slot class=${classMap({ hidden: !this.disabled })} name="disabled"></slot>
        `
    }

    connectedCallback(): void {
        super.connectedCallback()

        this.addEventListener('click', this.toggleEnabled)
    }

    disconnectedCallback(): void {
        super.disconnectedCallback()

        this.removeEventListener('click', this.toggleEnabled)
    }

    private toggleEnabled() {
        this.disabled = !this.disabled

        this.fireEvent<ToggleEventDetails>('toggle', {
            disabled: this.disabled
        })
    }
}
