import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import routes, { Page } from "./routes";

import defaultStyles from "../components/styles/default-styles.css"

@customElement('pages-layout')
export class PagesLayout extends LitElement {

    static styles = [defaultStyles, css`
        .content {
            height: 100%;
        }

        .header {
            height: 26px;

            border-bottom: 1px solid var(--border-color);
        }

        .tabs-list {
            display: flex;
            align-items: center;
            gap: 0.25rem;
            padding: 0 0.5rem;
        }

        .tabs-list__button {
            all: unset;
        }

        .tabs-list__button.active {

        }

        .page {
            height: calc(100% - 26px);
        }
    `]

    @state() private currentPage: Page

    constructor() {
        super()

        this.setPage('events-profiler')
    }

    protected render() {
        const content = routes[this.currentPage]

        return html`
            <div class="content">
                <div class="header tabs-list">
                    <button class="tabs-list__button ${classMap({ 'active': this.currentPage === 'events-profiler' })}" @click=${() => this.setPage('events-profiler')}>
                        profiler
                    </button>
                    <button class="tabs-list__button ${classMap({ 'active': this.currentPage === 'preferences-page' })}" @click=${() => this.setPage('preferences-page')}>
                        preferences
                    </button>
                </div>

                <div class="page">
                    ${content()}
                </div>
            </div>
        `
    }

    private setPage(page: Page) {
        this.currentPage = page
    }
}
