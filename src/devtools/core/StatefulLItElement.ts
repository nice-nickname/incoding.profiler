import { LitElement } from "lit";
import store, { RootState } from "../store";
import { Unsubscribe } from "@reduxjs/toolkit";

export default class StatefulLitElement extends LitElement {

    private unsubscribe: Unsubscribe

    connectedCallback(): void {
        super.connectedCallback()

        this.unsubscribe = store.subscribe(() => {
            const currentState = store.getState()

            if (this.onStateChanged) {
                this.onStateChanged(currentState)
            }
        })
    }

    disconnectedCallback(): void {
        super.disconnectedCallback()

        this.unsubscribe()
    }

    protected onStateChanged?(state: RootState): void;
}
