import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { LitComponentElement } from "../lit-component";
import { MaterialIcons } from "./material-icon-name";

import defaultStyles from "../styles/default-styles.css";
import styles from "./icon.css";


@customElement('x-icon')
export class IconElement extends LitComponentElement {

    static styles = [defaultStyles, styles]

    @property() icon: MaterialIcons

    @property() color: string | null

    protected render() {
        const styles = { color: this.color }

        return html`
            <i class="icon" style=${styleMap(styles)}>
                ${this.icon}
            </i>
        `
    }
}
