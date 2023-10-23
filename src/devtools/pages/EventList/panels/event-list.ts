import "../../../components/profiler-event"

import { css, html } from "lit";
import { customElement, state, query } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js"

import IncodingEvent from "../../../models/incodingEvent";
import { RootState } from "../../../store";

import scrollStyles from "../../../styles/scroll.css"
import StatefulLitElement from "../../../core/StatefulLItElement";
import { selectEvents } from "../../../store/EventList/selectors";


const styles = css`
    .container {
        display: flex;
        flex-direction: column;

        height: 100%;

        overflow-y: auto;
    }
`

@customElement('event-list')
export class EventListElement extends StatefulLitElement {

    static styles = [styles, scrollStyles]

    @state() private events: IncodingEvent[] = []

    @state() private scrollAttached: boolean = true

    @query('.container') private container: HTMLDivElement

    protected onStateChanged(state: RootState): void {
        this.events = selectEvents(state)

        if (this.scrollAttached) {
            this.container.scrollTop = this.container.scrollHeight
        }
    }

    protected render() {
        return html`
            <div class="container" @mousewheel=${this._onMouseWheel} >
                ${repeat(this.events, event => event.uuid + event.executionTimeMs, (event) => html`
                    <profiler-event .data=${event}></profiler-event>
                `)}
            </div>
        `
    }

    _onMouseWheel() {
        const containerScroll = this.container.scrollHeight - this.container.clientHeight

        this.scrollAttached = this.container.scrollTop === containerScroll;
    }
}
