export default class ButtonToggleEvent extends Event {

    enabled: boolean

    constructor(value: boolean) {
        super('toggle', {
            bubbles: false,
            composed: true,
        })

        this.enabled = value
    }
}
