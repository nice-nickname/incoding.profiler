import '../../../components/icon'

import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js"
import { clearEvents } from "../../../store/EventList/slice";
import store from "../../../store";


@customElement('event-list-header')
export class EventListHeaderElement extends LitElement {

    static styles = css`
        .header {
            display: flex;
            align-items: center;
            height: 1.75rem;
        }

        .separator {
            width: 1px;
            height: 1rem;

            background: var(--border-color);
            margin: 0 6px;
        }
    `

    protected render() {
        return html`
            <div class="header">
                <m-icon icon="stop_circle"></m-icon>
                <m-icon icon="block"></m-icon>
                <div class="separator"></div>
                <div>select</div>
                <div class="separator"></div>
            </div>
        `
    }
}
