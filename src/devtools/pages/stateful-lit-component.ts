import { LitElement } from "lit";
import store, { RootState } from "@devtools/store";
import { Unsubscribe } from "@reduxjs/toolkit";

export default class StatefulLitElement extends LitElement {

    private unsubscribe: Unsubscribe

    override connectedCallback(): void {
        super.connectedCallback()

        this.unsubscribe = store.subscribe(() => {
            this.onStateChanged?.call(this, store.getState())
        })

        this.onInitializeState?.call(this, store.getState())
        this.onStateChanged?.call(this, store.getState())
    }

    override disconnectedCallback(): void {
        super.disconnectedCallback()

        this.unsubscribe()
    }

    protected onInitializeState?(state: RootState): void;

    protected onStateChanged?(state: RootState): void;
}
