import { LitElement } from "lit";
import store, { RootState } from "@devtools/store";
import { Unsubscribe } from "@reduxjs/toolkit";

export default abstract class StatefulLitElement extends LitElement {

    private unsubscribe: Unsubscribe

    override connectedCallback(): void {
        super.connectedCallback()

        this.unsubscribe = store.subscribe(() => {
            this.onStateChanged(store.getState())
        })

        this.onStateChanged(store.getState())
    }

    override disconnectedCallback(): void {
        super.disconnectedCallback()

        this.unsubscribe()
    }

    protected abstract onStateChanged(state: RootState): void;
}
