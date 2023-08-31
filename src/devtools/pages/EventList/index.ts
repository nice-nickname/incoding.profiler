import './panels/event-list'
import './panels/event-viewer'

import { EventListElement } from './panels/event-list';

import { LitElement, css, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import { EventViewerElement } from './panels/event-viewer';

const styles = css`
    .panel-events {
        height: 100%;

        display: flex;
    }

    .panel-events event-list {
        width: 70%;
        height: 100%;
    }

    .panel-events event-viewer {
        width: 30%;
        border-left: 1px solid var(--border-color);
    }
`

@customElement("event-list-page")
export class EventListPage extends LitElement {

    static styles = [styles]

    @query('event-list')
    public eventListRef: EventListElement

    @query('event-viewer')
    public eventViewerRef: EventViewerElement

    render() {
        return html`
            <div class="panel-events">
                <event-list></event-list>
                <event-viewer></event-viewer>
            </div>
        `
    }
}
