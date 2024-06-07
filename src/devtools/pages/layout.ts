import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
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
                <div class="header">
                    <button @click=${() => this.setPage('events-profiler')}>profiler</button>
                    <button @click=${() => this.setPage('preferences-page')}>preferences</button>
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
