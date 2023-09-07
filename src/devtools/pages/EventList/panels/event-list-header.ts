import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js"
import { reduxStore } from "../../../slices";
import { clear } from "../../../slices/eventList";

@customElement('event-list-header')
export class EventListHeaderElement extends LitElement {

    static styles = css`
        .header {
            height: 2rem;
        }
    `

    render() {
        return html`
            <div class="header">
                <button @click=${this._clear}>clear</button>
            </div>
        `
    }

    _clear() {
        reduxStore.dispatch(clear())
    }
}
