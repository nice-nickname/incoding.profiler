import './panels/event-list'
import './panels/event-viewer'
import './panels/event-list-header'

import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";


const styles = css`
    .panel-events {
        height: 100%;

        display: flex;
    }

    .panel-events .event-list {
        width: 70%;
        height: 100%;

        display: flex;
        flex-direction: column;
    }

    event-list-header {
        flex-grow: 0;
        border-bottom: 1px solid var(--border-color);
    }

    event-list {
        flex-grow: 1;

        overflow: auto;
    }

    .panel-events event-viewer {
        width: 30%;
        border-left: 1px solid var(--border-color);
    }
`

@customElement("event-list-page")
export class EventListPage extends LitElement {

    static styles = [styles]

    constructor() {
        super()
    }

    render() {
        return html`
            <div class="panel-events">
                <div class="event-list">
                    <event-list-header></event-list-header>
                    <event-list></event-list>
                </div>
                <event-viewer></event-viewer>
            </div>
        `
    }
}
