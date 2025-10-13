import StatefulLitElement from "@devtools/pages/stateful-lit-component";
import resources from "@devtools/resources";
import store, { RootState } from "@devtools/store";
import { selectEvents } from "@devtools/store/event-list/selectors";
import { select } from "@devtools/store/event-viewer/slice";
import { virtualize } from '@lit-labs/virtualizer/virtualize.js';
import { html } from "lit";
import { customElement, query, state } from "lit/decorators.js";

import defaultStyles from "../../../components/styles/default-styles.css";
import scrollStyles from "../../../components/styles/scroll-styles.css";
import styles from "./event-list.css";


@customElement('event-list')
export class EventListElement extends StatefulLitElement {

    static styles = [defaultStyles, scrollStyles, styles]

    @state() private events: IncodingEvent[] = []

    private scrollAttached: boolean = true

    private isScrollable: boolean = false

    @query('.events-list') private scroller: HTMLDivElement

    @query('.events-list__scroll-button') private scrollDownButton: HTMLDivElement

    protected onStateChanged(state: RootState): void {
        this.events = selectEvents(state)

        if (this.scrollAttached && this.scroller?.scrollTop) {
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
            <div class="events-list" @scroll=${this.handleScroll}>
                <div class="events-list__container" @data-selected=${this.handleDataClick}>
                    ${virtualize({
                        items: this.events,
                        keyFunction: event => event.uuid + event.executionTimeMs,
                        renderItem: event => html`<incoding-event .data=${event}></incoding-event>`
                    })}
                </div>

                <div class="events-list__scroll-button" hidden>
                    <x-btn-icon
                        @click=${this.handleScrollDownClick}
                        icon="arrow_downward">
                    </x-btn-icon>
                </div>
            </div>
        `
    }

    private renderEmpty() {
        return html`
            <no-content text=${resources.no_items_in_list}></no-content>
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
            this.scrollDownButton.setAttribute('hidden', '')
        }
    }

    private handleDataClick(ev: CustomEvent<IncodingEvent>) {
        store.dispatch(select(ev.detail))
    }

    private handleScrollDownClick() {
        this.scroller.scrollTop = this.scroller.scrollHeight
        this.scrollAttached = true
    }
}
