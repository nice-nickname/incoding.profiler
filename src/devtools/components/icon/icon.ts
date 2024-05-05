import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from 'lit/directives/style-map.js';
import { LitComponentElement } from "../lit-component";
import { MaterialIconName } from "./material-icon-name";
import { MaterialIconSize } from "./material-icon-size";

import defaultStyles from "../styles/default-styles.css";
import styles from "./icon.css";


@customElement('material-icon')
export class IconElement extends LitComponentElement {

    static styles = [defaultStyles, styles]

    @property() icon: MaterialIconName

    @property() size: MaterialIconSize = 'md'

    @property() color?: string

    constructor() {
        super()

        this.style.height = `var(--size-${this.size})`
    }


    protected render() {
        return html`
            <div
                style="${styleMap({ color: this.color })}"
                class=${classMap({
                    'material-icon': true,
                    'material-icon-sm': this.size == 'sm',
                    'material-icon-md': this.size == 'md',
                    'material-icon-lg': this.size == 'lg'
                })}
            >
                ${this.icon}
            </div>
        `
    }
}
