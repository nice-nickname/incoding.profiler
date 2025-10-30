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
            height: 27px;

            border-bottom: 1px solid var(--border-color);
        }

        .page {
            height: calc(100% - 27px);
        }

        .tabs-list {
            display: flex;
            align-items: center;
            padding: 0 0.5rem;
        }

        .tabs-list__button {
            position: relative;

            display: flex;
            align-items: center;
            height: 100%;

            color: var(--text-color);
            font-weight: 600;
            text-decoration: none;
            padding: 0 0.75rem
        }

        .tabs-list__button:hover,
        .tabs-list__button:focus-visible {
            background: var(--bg-color-highlight)
        }

        .tabs-list__button:visited {
            text-decoration: none;
            color: unset;
        }

        .tabs-list__button.active {
            color: var(--color-primary);
        }

        .tabs-list__button.active::after {
            content: " ";
            display: block;

            position: absolute;
            left: 0;
            bottom: 0px;
            height: 3px;
            width: 100%;

            background: var(--color-primary);
            border-radius: 3px 3px 0 0;
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
                    <a class="tabs-list__button ${classMap({ 'active': this.currentPage === 'events-profiler' })}" @click=${() => this.setPage('events-profiler')} href="#">
                        <span>
                            Profiler
                        </span>
                    </a>
                    <a class="tabs-list__button ${classMap({ 'active': this.currentPage === 'preferences-page' })}" @click=${() => this.setPage('preferences-page')} href="#">
                        <span>
                            Preferences
                        </span>
                    </a>
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
