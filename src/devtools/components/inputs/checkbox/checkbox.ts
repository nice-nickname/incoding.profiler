import { LitComponentElement } from "@devtools/components/lit-component";
import { html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ChangeEventDetails } from "../events";

import defaultStyles from "../../styles/default-styles.css";
import styles from "./checkbox.css";


@customElement('x-checkbox')
export class CheckboxElement extends LitComponentElement {

    static styles = [defaultStyles, styles]

    @property({ type: Boolean }) checked: boolean = false

    @property({ type: Boolean }) indeterminate: boolean = false

    @property({ type: Boolean }) readOnly: boolean = false

    @property({ type: Boolean }) disabled: boolean = false

    @property() label: string = ''


    @property() onChange: (value: boolean) => void


    @query('input') private input: HTMLInputElement

    protected render() {
        return html`
            <label class="checkbox" ?readonly=${this.readOnly} ?disabled=${this.disabled} @change=${this.handleChange}>
                <input class="checkbox__input" type="checkbox"
                    .checked=${this.checked}
                    .indeterminate=${this.indeterminate}
                    .readOnly=${this.readOnly}
                    .disabled=${this.disabled} />
                <span class="checkbox__label">
                    ${this.label}
                </span>
            </label>
        `
    }

    private handleChange() {
        const checked = this.input.checked

        this.fireEvent<ChangeEventDetails<boolean>>('x-change', { value: checked })
        this.onChange?.call(this, checked)
    }
}
