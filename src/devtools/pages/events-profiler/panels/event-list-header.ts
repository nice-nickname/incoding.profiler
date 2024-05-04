import { ToggleEventDetails } from "@devtools/components/buttons/button-toggle/button-toggle";
import { ValueChangeEventDetail } from "@devtools/components/inputs/text/input-text";
import store from '@devtools/store';
import {
    clearEvents,
    pauseEvents,
    resetSearch,
    resumeEvents,
    searchEvents
} from '@devtools/store/event-list/slice';
import { debounce } from "@devtools/utils/debounce";
import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";


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

            <div>
                <input-text
                    placeholder="search..."
                    @value-change=${debounce(this.handleSearch, 300)}
                >
                </input-text>
            </div>
        `
    }

    private clearEventList() {
        store.dispatch(clearEvents())
    }

    private togglePauseEvents(ev: CustomEvent<ToggleEventDetails>) {
        if (!ev.detail.enabled) {
            store.dispatch(resumeEvents())
        } else {
            store.dispatch(pauseEvents())
        }
    }

    private handleSearch(ev: CustomEvent<ValueChangeEventDetail>) {
        const search = ev.detail.search

        if (search !== '') {
            store.dispatch(searchEvents(search))
        } else {
            store.dispatch(resetSearch())
        }
    }
}
