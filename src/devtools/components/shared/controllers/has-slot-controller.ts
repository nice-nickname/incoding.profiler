import { LitComponentElement } from "@devtools/components/lit-component";

export class HasSlotController {

    private slotsToRemove: string[] = []

    constructor(
        public root: LitComponentElement
    ) {
        this.root.shadowRoot!.addEventListener('slotchange', (ev) => {
            const slot = ev.target as HTMLSlotElement

            if (!this.slotsToRemove.includes(slot.name)) {
                return
            }

            const hasElement = slot.assignedElements().length > 0
            const hasNotEmptyText = !slot.assignedNodes().every(this.isNodeEmpty)

            if (!hasElement && !hasNotEmptyText) {
                slot.remove()
            }
        })
    }

    removeIfExists(name: string) {
        this.slotsToRemove.push(name === 'default' ? '' : name)
    }

    private isNodeEmpty(node: Node) {
        return node.textContent == null || node.textContent.trim().length === 0
    }
}
