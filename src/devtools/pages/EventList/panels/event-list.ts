import { css, html } from "lit";
import { customElement, state, query } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js"
import IncodingEvent from "@devtools/models/incodingEvent";
import store, { RootState } from "@devtools/store";
import scrollStyles from "@devtools/styles/scroll.css"
import StatefulLitElement from "@devtools/core/StatefulLItElement";
import { selectEvents } from "@devtools/store/EventList/selectors";
import resources from "@devtools/resources";
import { select } from "@devtools/store/EventViewer/slice";


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
        const hasEvents = this.events.length != 0

        return html`
            <div class="container" @mousewheel=${this.onMouseWheel} @data-selected=${this.onDataClick}>
                ${hasEvents
                    ? this.renderList()
                    : this.renderEmpty()}
            </div>
        `
    }

    private renderList() {
        return html`
            ${repeat(this.events, event => event.uuid + event.executionTimeMs, (event) => html`
                <profiler-event .data=${event}></profiler-event>
            `)}
        `
    }

    private renderEmpty() {
        return html`
            <no-content .text=${resources.no_items_in_list}></no-content>
        `
    }

    private onMouseWheel() {
        const containerScroll = this.container.scrollHeight - this.container.clientHeight

        this.scrollAttached = this.container.scrollTop === containerScroll;
    }

    private onDataClick(ev: CustomEvent<IncodingEvent>) {
        store.dispatch(select(ev.detail))
    }
}
