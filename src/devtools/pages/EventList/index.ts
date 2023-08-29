import './panels/event-list'
import './panels/json-viewer'

import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators";

const styles = css`
    .panel-events {
        height: 100%;

        display: flex;
    }

    .panel-events event-list {
        width: 70%;
        height: 100%;

        display: flex;
        flex-direction: column;

        overflow-y: auto;
    }

    .panel-events json-viewer {
        width: 30%;
        border-left: 1px solid var(--border-color);
    }
`

@customElement("event-list-page")
export class EventListPage extends LitElement {

    static styles = [styles]

    render() {
        return html`
            <div class="panel-events">
                <event-list></event-list>
                <json-viewer></json-viewer>
            </div>
        `
    }
}
