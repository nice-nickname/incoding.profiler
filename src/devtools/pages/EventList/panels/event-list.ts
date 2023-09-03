import "../../../components/profiler-event"

import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js"

import { IncodingEventExecutedMessage, IncodingEventMessage } from "../../../../messages/messages-list";
import IncodingEvent from "../../../models/incodingEvent";
import scrollStyles from "../../../utils/scrollStyles";

const styles = css`
    .container {
        display: flex;
        flex-direction: column;

        height: 100%;

        overflow-y: auto;
    }
`

@customElement('event-list')
export class EventListElement extends LitElement {

    static styles = [styles, scrollStyles]

    @state() private events: IncodingEvent[] = []

    render() {
        return html`
            <div class="container">
                ${repeat(this.events, event => event.uuid + event.executionTimeMs, (event) => html`
                    <profiler-event .data=${event}></profiler-event>
                `)}
            </div>
        `
    }

    addExecutionMessage(data: IncodingEventMessage) {
        this.events = [...this.events, data]
    }

    addExecutedMessage(data: IncodingEventExecutedMessage) {
        let oldEvent = this.events.find(s => s.uuid === data.uuid)
        oldEvent.executionTimeMs = data.executionTimeMs
        oldEvent.jsonData = data.jsonData

        this.events = [...this.events]
    }

    refresh() {
        this.events = []
    }
}
