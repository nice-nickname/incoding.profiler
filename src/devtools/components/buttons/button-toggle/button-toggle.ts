import { LitComponentElement } from "@devtools/components/lit-component";
import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import styles from "./button-toggle.css";

export type ToggleEventDetails = {
    enabled: boolean
}

@customElement('btn-toggle')
export class ButtonToggleElement extends LitComponentElement {

    static styles = [styles]

    @property({ type: Boolean }) disabled: boolean = false

    override connectedCallback(): void {
        super.connectedCallback()

        this.addEventListener('click', this.toggleEnabled)
    }

    override disconnectedCallback(): void {
        super.disconnectedCallback()

        this.removeEventListener('click', this.toggleEnabled)
    }

    protected render() {
        return html`
            <slot class=${classMap({ hidden: this.disabled })} name="enabled"></slot>
            <slot class=${classMap({ hidden: !this.disabled })} name="disabled"></slot>
        `
    }

    private toggleEnabled() {
        this.disabled = !this.disabled

        this.fireEvent<ToggleEventDetails>('toggle', {
            enabled: this.disabled
        })
    }
}
