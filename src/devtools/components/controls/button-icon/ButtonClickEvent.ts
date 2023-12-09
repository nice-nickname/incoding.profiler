export default class ButtonClickEvent extends Event {

    constructor() {
        super('click', {
            bubbles: false,
            composed: true
        });
    }
}
