
export default class ProfilerEventList {

    constructor(root) {
        this.root = root
        this.events = []
    }


    addEvent(profilerEvent) {
        this.events.push(profilerEvent)
    }
}
