import "../../../components/profiler-event"

import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators";
import { repeat } from "lit/directives/repeat"

import { IncodingEventExecutedMessage, IncodingEventMessage } from "../../../messages/messages-list";
import IncodingEvent from "../../../models/incodingEvent";

@customElement('event-list')
export class EventListElement extends LitElement {

    @state() private events: IncodingEvent[] = []

    constructor() {
        super()

        this.events = []
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

    render() {
        return html`
            ${repeat(this.events, event => event.uuid, (event) => html`
                <profiler-event .data=${event}></profiler-event>
            `)}
        `
    }
}
