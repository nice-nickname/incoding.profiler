import StatefulLitElement from '@devtools/components/stateful-lit-component';
import resources from '@devtools/resources';
import { RootState } from '@devtools/store';
import { selectSelectedJsonData } from '@devtools/store/event-viewer/selectors';
import { css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { IncodingEvent } from "src/types";


@customElement('event-viewer')
export class EventViewerElement extends StatefulLitElement {

    @state() private selectedEvent: IncodingEvent | null = null

    static styles = css`
        .list {
            display: flex;
            flex-direction: column;

            font-family: monospace;
            color: var(--text-color--accent);
        }

        .list .property {
            width: 100%;
        }

    `

    protected onStateChanged(state: RootState): void {
        this.selectedEvent = selectSelectedJsonData(state)
    }

    protected render() {
        return html`
            ${this.selectedEvent !== null
                ? this.renderContent()
                : this.renderEmpty()
            }`
    }

    private renderEmpty() {
        return html`<no-content .text=${resources.no_selected_item}></no-content>`
    }

    private renderContent() {
        var incoding = this.selectedEvent!

        return html`
            <div class="list">
                <div class="property">
                    <span>self:</span> <tag-link .tag=${incoding.self}></tag-link>
                </div>
            </div>
        `
    }
}
