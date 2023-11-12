
export default class SearchEvent extends Event {

    public value: string

    constructor(value: string) {
        super('search', {
            bubbles: false,
            composed: true
        })

        this.value = value
    }
}
