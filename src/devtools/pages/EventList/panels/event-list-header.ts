import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js"
import store from '@devtools/store';
import {
    clearEvents,
    pauseEvents,
    resetSearch,
    resumeEvents,
    searchEvents
} from '@devtools/store/EventList/slice';
import { debounce } from "@devtools/utils/debounce";
import { ToggleEventDetails } from "@devtools/components/controls/button-toggle";
import { SearchEventDetail } from "@devtools/components/inputs/search";


@customElement('event-list-header')
export class EventListHeaderElement extends LitElement {

    static styles = css`
        :host {
            display: flex;
            align-items: center;
            padding: 0 6px;

            height: 26px;
        }

        .separator {
            width: 1px;
            height: 1rem;

            background: var(--border-color);
            margin: 0 6px;
        }
    `

    protected render() {
        return html`
            <btn-group>
                <btn-toggle @toggle=${this.togglePauseEvents}>
                    <btn-icon slot="disabled" icon="stop_circle"></btn-icon>
                    <btn-icon slot="enabled" icon="stop_circle" color="var(--danger-color)"></btn-icon>
                </btn-toggle>

                <btn-icon icon="block" @click=${this.clearEventList}></btn-icon>
            </btn-group>

            <div class="separator"></div>

            <div>select</div>

            <div class="separator"></div>

            <input-search
                placeholder="search..."
                @search=${debounce(this.handleSearchEvents, 300)}>
            </input-search>
        `
    }

    private clearEventList() {
        store.dispatch(clearEvents())
    }

    private togglePauseEvents(ev: CustomEvent<ToggleEventDetails>) {
        if (!ev.detail.disabled) {
            store.dispatch(resumeEvents())
        } else {
            store.dispatch(pauseEvents())
        }
    }

    private handleSearchEvents(ev: CustomEvent<SearchEventDetail>) {
        const search = ev.detail.search

        if (search !== '') {
            store.dispatch(searchEvents(search))
        } else {
            store.dispatch(resetSearch())
        }
    }
}
