import { html } from "lit";
import { customElement, property, query } from "lit/decorators.js"
import { IncodingEvent } from 'src/types';
import { LitComponentElement } from "../lit-component";

import styles from "./styles.css"

@customElement('profiler-event')
export class ProfilerEventElement extends LitComponentElement {

    static styles = styles

    @property({ type: Object }) data: IncodingEvent

    protected render() {
        console.log(this.data)

        return html`
            <div class="event" @click="${this.handleClick}">
                <action-marker .action=${this.data.action}></action-marker>
                <time-marker .timeInMs=${this.data.executionTimeMs}></time-marker>
                <div>${this.data.eventName}</div>

                <tag-link .tag=${this.data.self} @click=${this.handleInspectSelf}></tag-link>
            </div>
        `
    }

    private handleClick() {
        this.fireEvent('data-selected', this.data)
    }

    private handleInspectSelf() {
        const element = `$('[data-profiler-id="${this.data.self.profilerId}"]')[0]`

        chrome.devtools.inspectedWindow.eval(`inspect(${element})`, function(res, err) {
            console.log(res, err, element)
        })
    }
}
