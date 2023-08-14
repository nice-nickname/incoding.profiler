import { stringToHtml } from "../../utils"
import view from "../views/event.hbs"

export default class ProfilerEvent {
    constructor(eventData) {
        this.eventData = eventData
        this.html = stringToHtml(view(eventData.payload))

        this.timestamp = this.html.querySelector('[role=timestamp]')
        this.jsonData = this.html.querySelector('[role=data]')
        this.self = this.html.querySelector('[role=self]')
        this.target = this.html.querySelector('[role=target]')
    }

    update(other) {
        let elapsedInMs = other.payload.timestamp - this.eventData.payload.timestamp
        this.timestamp.innerHTML = Number(elapsedInMs).toFixed(2) + ' ms'
    }
}
