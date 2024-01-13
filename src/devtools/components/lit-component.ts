import { LitElement } from "lit"

export class LitComponentElement extends LitElement {

    protected fireEvent<T = void>(type: string, data: T) {
        const event = new CustomEvent(type, {
            bubbles: true,
            composed: true,
            detail: data
        })

        this.dispatchEvent(event)
    }
}
