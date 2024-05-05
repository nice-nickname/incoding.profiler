import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import defaultStyles from "../styles/default-styles.css";
import styles from "./no-content.css";


@customElement('no-content')
export class NoContentPlaceholderElement extends LitElement {

    static styles = [defaultStyles, styles]

    @property() text: string = ''

    protected render() {
        return html`
            <span>${this.text}</span>
        `
    }
}
