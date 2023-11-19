import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js"
import SearchEvent from '../../../components/inputs/search/SearchChangeEvent';
import store from '../../../store';
import { clearEvents, pauseEvents, resetSearch, resumeEvents, searchEvents } from '../../../store/EventList/slice';
import ButtonToggleEvent from '../../../components/controls/button-toggle/ButtonToggleEvent';


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

            <input-search placeholder="search..." @search=${this.onSearchEvents}></input-search>
        `
    }

    private clearEventList() {
        store.dispatch(clearEvents())
    }

    private togglePauseEvents(ev: ButtonToggleEvent) {
        if (ev.enabled) {
            store.dispatch(resumeEvents())
        } else {
            store.dispatch(pauseEvents())
        }
    }

    private onSearchEvents(ev: SearchEvent) {
        const searchValue = ev.value

        if (searchValue !== '') {
            store.dispatch(searchEvents(searchValue))
        } else {
            store.dispatch(resetSearch())
        }
    }
}
