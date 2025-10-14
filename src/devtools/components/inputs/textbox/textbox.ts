import { LitComponentElement } from "@devtools/components/lit-component";
import { html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { live } from "lit/directives/live.js";
import { ChangeEventDetails } from "../events";

import defaultStyles from "../../styles/default-styles.css";
import styles from "./textbox.css";


@customElement("x-textbox")
export class ATextboxElement extends LitComponentElement {

    static styles = [defaultStyles, styles]

    @property({ type: Boolean }) disabled: boolean = false

    @property({ type: Boolean }) readOnly: boolean = false

    @property() placeholder: string = ''

    @property() value: string = ''


    @property() onChange: (value: string) => void


    @query('input') private input: HTMLInputElement

    protected render() {
        return html`
            <div class="textbox" ?disabled=${this.disabled} ?readonly=${this.readOnly}>
                <input
                    .placeholder=${this.placeholder}
                    .value=${live(this.value)}
                    .disabled=${this.disabled}
                    .readOnly=${this.readOnly}
                    @input=${this.handleInput} />
            </div>
        `
    }

    private handleInput() {
        this.value = this.input.value;

        this.fireEvent<ChangeEventDetails>('x-change', { value: this.value })
        this.onChange?.call(this, this.value)
    }
}
