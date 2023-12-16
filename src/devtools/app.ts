import "@devtools/components"
import '@devtools/pages/EventList/index'

import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { choose } from "lit/directives/choose.js"
import resources from "@devtools/resources";
import { ProfilerMessage } from "../messages/messages";
import store from "./store";
import { addEvent, updateEvent } from "./store/EventList/slice";
import {
    IncodingEventExecutedMessage,
    IncodingEventMessage
} from "src/messages/messages-list";


@customElement('incoding-profiler-devtools')
export class IncodingProfilerDevtools extends LitElement {

    @state() private status: 'loading' | 'started' | 'failed'

    private connection: chrome.runtime.Port

    override connectedCallback(): void {
        super.connectedCallback()

        this.status = 'loading'

        this.checkIncodingFrameworkAndStart()
    }

    override disconnectedCallback(): void {
        super.disconnectedCallback()

        this.connection.onMessage.removeListener(this.onProfilerMessage)
        this.connection.disconnect()

        this.status = 'loading'
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
        this.connection = chrome.runtime.connect({ name: tabId })

        this.connection.onMessage.addListener(this.onProfilerMessage)

        this.status = 'started'
    }

    private onProfilerMessage(message: ProfilerMessage) {
        switch (message.name) {
            case 'execute-start':
                store.dispatch(addEvent(<IncodingEventMessage>message.data))
                break;

            case 'execute-finish':
                store.dispatch(updateEvent(<IncodingEventExecutedMessage>message.data))
                break;

            default:
                break;
        }
    }

    protected render() {
        return html`
            ${choose(this.status, [
                ['loading', this.renderLoading],
                ['started', this.renderContent],
                ['failed', this.renderFail]
            ])}
        `
    }

    private renderContent() {
        return html`<event-list-page></event-list-page>`
    }

    private renderLoading() {
        return html`${resources.profiler_loading}`
    }

    private renderFail() {
        return html`${resources.no_incoding_framework_found}`
    }
}
