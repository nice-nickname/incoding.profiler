import StatefulLitElement from "@devtools/components/stateful-lit-component";
import resources from "@devtools/resources";
import store, { RootState } from "@devtools/store";
import { selectEvents } from "@devtools/store/event-list/selectors";
import { select } from "@devtools/store/event-viewer/slice";
import scrollStyles from "@devtools/styles/scroll.css";
import { css, html } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { IncodingEvent } from "src/types";

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
            <div class="container" @mousewheel=${this.handleMouseWheel} @data-selected=${this.handleDataClick}>
                ${hasEvents
                    ? this.renderList()
                    : this.renderEmpty()}
            </div>
        `
    }

    private renderList() {
        return html`
            ${repeat(this.events, event => event.uuid + event.executionTimeMs, (event) => html`
                <incoding-event .data=${event}></incoding-event>
            `)}
        `
    }

    private renderEmpty() {
        return html`
            <no-content .text=${resources.no_items_in_list}></no-content>
        `
    }

    private handleMouseWheel() {
        const containerScroll = this.container.scrollHeight - this.container.clientHeight

        this.scrollAttached = this.container.scrollTop === containerScroll;
    }

    private handleDataClick(ev: CustomEvent<IncodingEvent>) {
        store.dispatch(select(ev.detail))
    }
}
