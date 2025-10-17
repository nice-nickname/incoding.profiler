import { ToggleEventDetails } from "@devtools/components/buttons/button-toggle/button-toggle";
import { ChangeEventDetails } from "@devtools/components/inputs/events";
import StatefulLitElement from "@devtools/pages/stateful-lit-component";
import resources from "@devtools/resources";
import store, { RootState } from '@devtools/store';
import { selectActions, selectEvents, selectEventsSearch, selectIsEventsPaused } from "@devtools/store/event-list/selectors";
import {
    clearEvents,
    pauseEvents,
    resetSearch,
    resumeEvents,
    searchEvents,
    setActions,
    toggleAction
} from '@devtools/store/event-list/slice';
import { unselect } from "@devtools/store/event-viewer/slice";
import { debounce } from "@devtools/utils/debounce";
import { html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { allIncActions } from "@devtools/utils/const";

import styles from "./event-list-header.css";


@customElement('event-list-header')
export class EventListHeaderElement extends StatefulLitElement {

    static styles = [styles]

    private isEventsPaused: boolean
    private eventsSearch: string | null

    @state() private actions: IncodingActions[]

    protected onInitializeState(state: RootState): void {
        this.isEventsPaused = selectIsEventsPaused(state)
        this.eventsSearch = selectEventsSearch(state)
        this.actions = selectActions(state)
    }

    protected onStateChanged(state: RootState): void {
        this.actions = selectActions(state)
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

            <x-dropdown>
                <x-btn slot="trigger">
                    Select
                    <x-icon style="font-size: 22px;" icon="arrow_drop_down" slot="postfix"></x-icon>
                </x-btn>

                <x-dropdown-menu>
                    <x-dropdown-menu-item>
                        <x-checkbox
                            .label=${resources.selectAll}
                            .checked=${this.actions.length === allIncActions.length}
                            .indeterminate=${this.actions.length > 0 && this.actions.length !== allIncActions.length}
                            .onChange=${this.toggleAllItems}>
                        </x-checkbox>
                    </x-dropdown-menu-item>

                    <x-dropdown-divider></x-dropdown-divider>

                    ${allIncActions.map((incAction) => html`
                        <x-dropdown-menu-item>
                            <x-checkbox
                                .label=${incAction}
                                .checked=${this.actions.includes(incAction)}
                                .onChange=${() => this.toggleItem(incAction)}>
                            </x-checkbox>
                        </x-dropdown-menu-item>
                    `)}
                </x-dropdown-menu>
            </x-dropdown>

            <div class="separator"></div>

            <div>
                <x-textbox
                    .placeholder=${resources.search}
                    .value=${this.eventsSearch || ''}
                    @x-change=${debounce(this.handleSearch, 300)}>
                </x-textbox>
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

    private handleSearch(ev: CustomEvent<ChangeEventDetails>) {
        const search = ev.detail.value

        if (search !== '') {
            store.dispatch(searchEvents(search))
        } else {
            store.dispatch(resetSearch())
        }
    }

    private toggleAllItems(value: boolean) {
        store.dispatch(setActions(value ? allIncActions : []))
    }

    private toggleItem(incAction: IncodingActions) {
        store.dispatch(toggleAction(incAction))
    }
}
