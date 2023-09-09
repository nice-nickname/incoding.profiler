import "../../../components/profiler-event"

import { LitElement, css, html } from "lit";
import { customElement, state, query } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js"

import IncodingEvent from "../../../models/incodingEvent";
import scrollStyles from "../../../utils/scrollStyles";
import store from "../../../store";

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

    @state() private scrollAttached: boolean = true

    @query('.container') private container: HTMLDivElement

    constructor() {
        super()

        store.subscribe(() => {
            this.events = store.getState().eventList.events

            if (this.scrollAttached) {
                this.container.scrollTop = this.container.scrollHeight
            }
        })
    }

    render() {
        return html`
            <div class="container" @mousewheel=${this._onMouseWheel} >
                ${repeat(this.events, event => event.uuid + event.executionTimeMs, (event) => html`
                    <profiler-event .data=${event}></profiler-event>
                `)}
            </div>
        `
    }

    _onMouseWheel() {
        let containerScroll = this.container.scrollHeight - this.container.clientHeight

        this.scrollAttached = this.container.scrollTop === containerScroll;
    }
}
