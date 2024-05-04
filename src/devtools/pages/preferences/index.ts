import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

import styles from './styles.css';

@customElement("preferences-page")
export class PreferencesPage extends LitElement {

    static styles = [styles]

    protected render() {
        return html`
            <div>preferences</div>
        `
    }
}
