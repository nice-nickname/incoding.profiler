import { LitComponentElement } from "@devtools/components/lit-component";
import { html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ChangeEventDetails } from "../events";

@customElement('x-checkbox')
export class CheckboxElement extends LitComponentElement {

    @property({ type: Boolean }) checked: boolean = false

    @property() label: string = ''

    @query('input') input: HTMLInputElement

    protected render() {
        return html`
            <label class="checkbox" @change=${this.handleChange}>
                <input class="checkbox__input" type="checkbox" />
                <span class="checkbox__label">
                    ${this.label}
                </span>
            </label>
        `
    }

    private handleChange() {
        const checked = this.input.checked

        this.fireEvent<ChangeEventDetails<boolean>>('x-change', {
            value: checked
        })
    }
}
