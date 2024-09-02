import RuntimeConnection, { DevtoolsConnection } from "@connection/RuntimeConnection";
import runtimeConnectionCtx from "@devtools/context/connection";
import resources from "@devtools/resources";
import store from "@devtools/store";
import { addEvent, clearEvents, updateEvent } from "@devtools/store/event-list/slice";
import { provide } from "@lit/context";
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { choose } from "lit/directives/choose.js";

import "@devtools/components";
import '@devtools/pages';

@customElement('incoding-profiler-devtools')
export class IncodingProfilerDevtools extends LitElement {

    @state()
    private status: 'loading' | 'started' | 'failed'

    @provide({ context: runtimeConnectionCtx })
    private connection: DevtoolsConnection = new RuntimeConnection('devtools')

    override connectedCallback(): void {
        super.connectedCallback()

        this.status = 'loading'

        this.checkIncodingFrameworkAndStart()
    }

    override disconnectedCallback(): void {
        super.disconnectedCallback()

        this.connection.disconnect()

        this.status = 'loading'
    }

    protected render() {
        return html`
            ${choose(this.status, [
            ['loading', () => html`${resources.profiler_loading}`],
            ['failed', () => html`${resources.no_incoding_framework_found}`],
            ['started', () => html`<pages-layout></pages-layout>`],
        ])}
        `
    }

    private checkIncodingFrameworkAndStart() {
        chrome.devtools.inspectedWindow.eval(
            'ExecutableBase.name',
            (result, error) => {
                if (result !== 'ExecutableBase' || error) {
                    this.status = 'failed'
                    return;
                }

                this.startProfiler()
            })
    }

    private startProfiler() {
        const tabId = String(chrome.devtools.inspectedWindow.tabId)

        this.connection.on('event-execution-start', event => {
            store.dispatch(addEvent(event))
        })

        this.connection.on('event-execution-finish', event => {
            store.dispatch(updateEvent(event))
        })

        this.connection.on('refresh', () => {
            store.dispatch(clearEvents())
        })

        this.connection.connect(tabId)

        this.status = 'started'
    }
}
