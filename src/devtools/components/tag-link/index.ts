import { customElement, property } from "lit/decorators.js";
import { LitComponentElement } from "../lit-component";
import { html } from "lit";
import { Tag } from "src/types/index";

import styles from "./styles.css"

@customElement('tag-link')
export class TagLinkElement extends LitComponentElement {

    static styles = styles

    @property({ attribute: false }) tag: Tag

    protected render() {
        const { tagName, classList, id } = this.formatTag()

        const openBrace = html`<span class="brace"><</span>`
        const closingBrace = html`<span class="brace">></span>`
        const tagElement = html`<span class="tag">${tagName}</span>`
        const classElement = html`<span class="classList">${classList}</span>`
        const idElement = html`<span class="id">${id}</span>`

        return html`
            <pre>${openBrace}${tagElement}${classElement}${idElement}${closingBrace}</pre>
        `
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
