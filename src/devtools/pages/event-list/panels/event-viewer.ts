import { html } from "lit";
import { customElement, state } from "lit/decorators.js";
import JsonData from "@devtools/types/json-data"
import { RootState } from '@devtools/store';
import StatefulLitElement from '@devtools/core/StatefulLItElement';
import { selectSelectedJsonData } from '@devtools/store/event-viewer/selectors';
import resources from '@devtools/resources';


@customElement('event-viewer')
export class EventViewerElement extends StatefulLitElement {

    @state() private jsonData: JsonData | null = null

    protected onStateChanged(state: RootState): void {
        this.jsonData = selectSelectedJsonData(state)
    }

    protected render() {
        return html`
            ${this.jsonData !== null
                ? this.renderContent()
                : this.renderEmpty()
            }`
    }

    private renderEmpty() {
        return html`<no-content .text=${resources.no_selected_item}></no-content>`
    }

    private renderContent() {
        return html``
    }
}
