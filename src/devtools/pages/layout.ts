import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import routes, { PageKey } from "./routes";

@customElement('pages-layout')
export class PagesLayout extends LitElement {

    static styles = css`
        .content {
            height: 100%;
        }

        .header {
            height: 26px;

            border-bottom: 1px solid var(--border-color);
        }

        .page {
            height: calc(100% - 40px);
        }
    `

    @state() private currentPage: PageKey

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

    private setPage(page: PageKey) {
        this.currentPage = page
    }
}
