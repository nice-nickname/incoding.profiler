import './panels/event-list'
import './panels/event-viewer'
import './panels/event-list-header'

import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

import styles from './index.css'


@customElement("event-list-page")
export class EventListPage extends LitElement {

    static styles = [styles]

    constructor() {
        super()
    }

    render() {
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
