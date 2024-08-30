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

    @property() placeholder: string = ''

    @property() value: string = ''

    @query('input') input: HTMLInputElement

    protected render() {
        return html`
            <div class="textbox">
                <input
                    .placeholder=${this.placeholder}
                    .value=${live(this.value)}
                    @input=${this.handleInput}
                    />
            </div>
        `
    }


    private handleInput() {
        this.value = this.input.value;

        this.fireEvent<ChangeEventDetails>('x-change', {
            value: this.value
        })
    }
}
