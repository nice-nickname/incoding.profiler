import { ToggleEventDetails } from "@devtools/components/buttons/button-toggle/button-toggle";
import { ValueChangeEventDetail } from "@devtools/components/inputs/text/input-text";
import StatefulLitElement from "@devtools/pages/stateful-lit-component";
import store, { RootState } from '@devtools/store';
import { selectEventsSearch, selectIsEventsPaused } from "@devtools/store/event-list/selectors";
import {
    clearEvents,
    pauseEvents,
    resetSearch,
    resumeEvents,
    searchEvents
} from '@devtools/store/event-list/slice';
import { unselect } from "@devtools/store/event-viewer/slice";
import { debounce } from "@devtools/utils/debounce";
import { css, html } from "lit";
import { customElement } from "lit/decorators.js";


@customElement('event-list-header')
export class EventListHeaderElement extends StatefulLitElement {

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

    private isEventsPaused: boolean
    private eventsSearch: string | null

    protected onInitializeState(state: RootState): void {
        this.isEventsPaused = selectIsEventsPaused(state)
        this.eventsSearch = selectEventsSearch(state)
    }

    protected render() {
        return html`
            <x-btn-group>
                <x-btn-toggle @toggle=${this.togglePauseEvents} ?disabled=${this.isEventsPaused}>
                    <x-btn-icon icon="stop_circle" slot="disabled"></x-btn-icon>
                    <x-btn-icon icon="stop_circle" slot="enabled" color="var(--danger-color)"></x-btn-icon>
                </x-btn-toggle>

                <x-btn-icon icon="block" @click=${this.clearEventList}></x-btn-icon>
            </x-btn-group>

            <div class="separator"></div>

            <x-btn>
                Select
            </x-btn>

            <div class="separator"></div>

            <div>
                <input-text
                    placeholder="search..."
                    value=${this.eventsSearch || ''}
                    @value-change=${debounce(this.handleSearch, 300)}
                >
                </input-text>
            </div>
        `
    }



    private clearEventList() {
        store.dispatch(clearEvents())
        store.dispatch(unselect())
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
