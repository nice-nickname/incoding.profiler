import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

import styles from './index.css';

import './event-viewer/event-viewer';
import './events-list/events-list';
import './events-list/events-list-header';
import './events-list/incoding-event';


@customElement("event-profiler-page")
export class EventListPage extends LitElement {

    static styles = [styles]

    protected render() {
        return html`
            <div class="panel-events">
                <div class="event-list">
                    <event-list-header></event-list-header>
                    <event-list></event-list>
                </div>
                <event-viewer></event-viewer>
            </div>
        `
    }
}
