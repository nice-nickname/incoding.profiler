import { LitElement, html } from "lit";
import { customElement, queryAssignedElements, state } from "lit/decorators.js";
import ButtonToggleEvent from "./ButtonToggleEvent";

@customElement('btn-toggle')
export class ButtonToggleElement extends LitElement {

    @state() enabled: boolean = true

    @queryAssignedElements({ slot: 'enabled' }) enabledButton: HTMLElement[]

    @queryAssignedElements({ slot: 'disabled' }) disabledButton: HTMLElement[]

    protected render() {
        return html`
            <slot name="enabled" @slotchange=${this.initSlot}></slot>
            <slot name="disabled" @slotchange=${this.initSlot}></slot>
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

    private initSlot() {
        this.enabledButton.forEach(el => el.style.display = 'block')
        this.disabledButton.forEach(el => el.style.display = 'none')
    }

    private toggleEnabled() {
        this.enabled = !this.enabled

        if (this.enabled) {
            this.enabledButton.forEach(el => el.style.display = 'block')
            this.disabledButton.forEach(el => el.style.display = 'none')
        }
        else {
            this.enabledButton.forEach(el => el.style.display = 'none')
            this.disabledButton.forEach(el => el.style.display = 'block')
        }

        this.dispatchEvent(new ButtonToggleEvent(this.enabled))
    }
}
