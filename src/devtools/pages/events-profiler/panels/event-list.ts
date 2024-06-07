import StatefulLitElement from "@devtools/components/stateful-lit-component";
import resources from "@devtools/resources";
import store, { RootState } from "@devtools/store";
import { selectEvents } from "@devtools/store/event-list/selectors";
import { select } from "@devtools/store/event-viewer/slice";
import { css, html } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import { IncodingEvent } from "src/types";
import { virtualize } from '@lit-labs/virtualizer/virtualize.js';


@customElement('event-list')
export class EventListElement extends StatefulLitElement {

    static styles = css`
        ::-webkit-scrollbar {
            background-color: #393b41;
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 1px;
        }

        ::-webkit-scrollbar-button {
            display: none;
        }

        ::-webkit-scrollbar-thumb {
            background-color: #a4abb5;
            border: 1px solid transparent;
            background-clip: content-box;
            border-radius: 0.125rem;
        }

        .wrapper {
            height: 100%;
            overflow-y: auto;
        }

        .container {
            display: flex;
            flex-direction: column;

            height: 100%;
            overflow-y: auto;

            font-family: monospace;
            color: var(--text-color--accent);
        }

        .container > incoding-event {
            width: 100%
        }
    `

    @state() private events: IncodingEvent[] = []

    @state() private scrollAttached: boolean = true

    @query('.wrapper') private scroller: HTMLDivElement

    protected onStateChanged(state: RootState): void {
        this.events = selectEvents(state)

        if (this.scrollAttached) {
            this.scroller.scrollTop = this.scroller.scrollHeight
        }
    }


    protected render() {
        const hasEvents = this.events.length != 0

        return html`
            <div class="wrapper" @mousewheel=${this.handleMouseWheel}>
                ${hasEvents
                    ? this.renderList()
                    : this.renderEmpty()}
            </div>
        `
    }

    private renderList() {
        return html`
            <div class="container" @data-selected=${this.handleDataClick}>
                ${virtualize({
                    items: this.events,
                    keyFunction: event => event.uuid + event.executionTimeMs,
                    renderItem: event => html`<incoding-event .data=${event}></incoding-event>`
                })}
            </div>
        `
    }

    private renderEmpty() {
        return html`
            <no-content .text=${resources.no_items_in_list}></no-content>
        `
    }

    private handleMouseWheel() {
        const containerScroll = this.scroller.scrollHeight - this.scroller.clientHeight

        this.scrollAttached = this.scroller.scrollTop === containerScroll;
    }

    private handleDataClick(ev: CustomEvent<IncodingEvent>) {
        store.dispatch(select(ev.detail))
    }
}
