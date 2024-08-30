import { inspectHostElement } from "@devtools/utils/evalAtHost";
import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { LitComponentElement } from "../lit-component";

import defaultStyles from "../styles/default-styles.css";
import resetButtonStyles from "../styles/reset-button.css";
import styles from "./tag-link.css";

@customElement('tag-link')
export class TagLinkElement extends LitComponentElement {

    static styles = [defaultStyles, resetButtonStyles, styles]

    @property({ attribute: false }) tag: Tag

    protected render() {
        const { tagName, classList, id } = this.formatTag()

        const openBrace = html`<span class="tag__brace"><</span>`
        const closingBrace = html`<span class="tag__brace">></span>`
        const tagElement = html`<span class="tag__element">${tagName}</span>`
        const classElement = html`<span class="tag__classList">${classList}</span>`
        const idElement = html`<span class="tag__id">${id}</span>`

        return html`
            <button @click=${this.handleClick}>
                <pre class="tag">${openBrace}${tagElement}${classElement}${idElement}${closingBrace}</pre>
            </button>
        `
    }

    private handleClick() {
        inspectHostElement(this.tag.profilerId)
    }

    private formatTag() {
        let classList = ''
        let id = ''

        if (!this.tag.id && this.classList.length > 0) {
            classList = '.' + this.tag.classes.join('.')
        }

        if (this.tag.id) {
            id = '#' + this.tag.id
        }

        return {
            tagName: this.tag.tagName,
            classList,
            id
        }
    }
}
