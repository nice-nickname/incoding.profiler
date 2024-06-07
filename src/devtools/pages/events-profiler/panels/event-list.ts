import { IconButtonElement } from "@devtools/components/buttons/button-icon/button-icon";
import StatefulLitElement from "@devtools/components/stateful-lit-component";
import resources from "@devtools/resources";
import store, { RootState } from "@devtools/store";
import { selectEvents } from "@devtools/store/event-list/selectors";
import { select } from "@devtools/store/event-viewer/slice";
import { virtualize } from '@lit-labs/virtualizer/virtualize.js';
import { css, html } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import { IncodingEvent } from "src/types";

import defaultStyles from "../../../components/styles/default-styles.css";


@customElement('event-list')
export class EventListElement extends StatefulLitElement {

    static styles = [defaultStyles, css`
        :host {
            position: relative;
        }

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

        .floating-button-down {
            position: absolute;
            right: 0;
            bottom: 0;
            margin-right: 1rem;
            margin-bottom: 1rem;

            display: flex;
            padding: 0.125rem;
            background: var(--bg-color);
            border-radius: 100%;
            border: 1px solid var(--border-color);
        }
    `]

    @state() private events: IncodingEvent[] = []

    private scrollAttached: boolean = true

    private isScrollable: boolean = false

    @query('.wrapper') private scroller: HTMLDivElement

    @query('.floating-button-down') private scrollDownButton: HTMLDivElement

    protected onStateChanged(state: RootState): void {
        this.events = selectEvents(state)

        if (this.scrollAttached) {
            this.scroller.scrollTop = this.scroller.scrollHeight
        }
    }

    protected render() {
        const hasEvents = this.events.length != 0

        return html`
            ${hasEvents
                ? this.renderList()
                : this.renderEmpty()}
        `
    }

    private renderList() {
        return html`
            <div class="wrapper" @scroll=${this.handleScroll}>
                <div class="container" @data-selected=${this.handleDataClick}>
                    ${virtualize({
                        items: this.events,
                        keyFunction: event => event.uuid + event.executionTimeMs,
                        renderItem: event => html`<incoding-event .data=${event}></incoding-event>`
                    })}
                </div>

                <div class="floating-button-down" hidden>
                    <btn-icon
                        @click=${this.handleScrollDownClick}
                        icon="arrow_downward"
                        size="lg">
                    </btn-icon>
                </div>
            </div>
        `
    }

    private renderEmpty() {
        return html`
            <no-content .text=${resources.no_items_in_list}></no-content>
        `
    }

    private handleScroll() {
        const containerScroll = this.scroller.scrollHeight - this.scroller.clientHeight

        this.scrollAttached = this.scroller.scrollTop === containerScroll;
        this.isScrollable = this.scroller.scrollHeight > this.scroller.clientHeight

        // TODO: Too imperative
        if (this.isScrollable && !this.scrollAttached) {
            this.scrollDownButton.removeAttribute('hidden')
        } else {
            this.scrollDownButton.setAttribute('hidden',  '')
        }
    }

    private handleDataClick(ev: CustomEvent<IncodingEvent>) {
        store.dispatch(select(ev.detail))
    }

    private handleScrollDownClick() {
        this.scroller.scrollTop = this.scroller.scrollHeight
    }
}
