import { LitComponentElement } from "@devtools/components/lit-component";
import { Colors, Sizing } from "@devtools/components/shared";
import { HasSlotController } from "@devtools/components/shared/controllers/has-slot-controller";
import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import defaultStyles from "../../styles/default-styles.css";
import styles from "./button.css";

@customElement('x-btn')
export class ButtonComponent extends LitComponentElement {

    static styles = [defaultStyles, styles]

    @property() size: Sizing = 'md'

    @property() color: Colors = 'default'

    protected render() {
        const hasSlot = new HasSlotController(this)

        hasSlot.removeIfExists('prefix')
        hasSlot.removeIfExists('postfix')
        hasSlot.removeIfExists('default')

        return html`
            <button class=${classMap({
                button: true,
                'button--small': this.size === 'sm',
                'button--medium': this.size === 'md',
                'button--large': this.size === 'lg',
                'button--default': this.color === 'default'
            })}>
                <slot class="button__prefix" name="prefix"></slot>
                <slot class="button__label"></slot>
                <slot class="button__postfix" name="postfix"></slot>
            </button>
        `
    }
}
