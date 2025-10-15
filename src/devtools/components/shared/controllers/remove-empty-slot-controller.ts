import { LitComponentElement } from "@devtools/components/lit-component";
import { ReactiveController } from "lit";


export class RemoveEmptySlotController implements ReactiveController {

    private host: LitComponentElement

    constructor(host: LitComponentElement) {
        (this.host = host).addController(this)
    }

    hostUpdated(): void {
        const slots = this.host.shadowRoot?.querySelectorAll('slot') || []

        slots.forEach((slot) => {
            const nodes = slot.assignedNodes()

            if (nodes.length === 0 || nodes.every(this.isNodeEmpty)) {
                slot.remove()
            }
        })

    }

    private isNodeEmpty(node: Node) {
        return node.nodeType !== Node.ELEMENT_NODE && (node.textContent == null || node.textContent.trim().length === 0)
    }
}
