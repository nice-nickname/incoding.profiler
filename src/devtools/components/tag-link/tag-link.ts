import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Tag } from "src/types/index";
import { LitComponentElement } from "../lit-component";

import resetButtonStyles from "../../styles/reset-button.css";
import styles from "./tag-link.css";

@customElement('tag-link')
export class TagLinkElement extends LitComponentElement {

    static styles = [styles, resetButtonStyles]

    @property({ attribute: false }) tag: Tag

    protected render() {
        const { tagName, classList, id } = this.formatTag()

        const openBrace = html`<span class="brace"><</span>`
        const closingBrace = html`<span class="brace">></span>`
        const tagElement = html`<span class="tag">${tagName}</span>`
        const classElement = html`<span class="classList">${classList}</span>`
        const idElement = html`<span class="id">${id}</span>`

        return html`
            <button @click=${this.handleClick}>
                <pre>${openBrace}${tagElement}${classElement}${idElement}${closingBrace}</pre>
            </button>
        `
    }

    private handleClick() {
        const element = `$('[data-profiler-id="${this.tag.profilerId}"]')[0]`

        chrome.devtools.inspectedWindow.eval(`inspect(${element})`, function(res, err) {
            console.log(res, err, element)
        })
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
