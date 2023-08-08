import view from "../views/event.hbs"

export class IncodingEvent {

    constructor(event) {
        this.event = event
        let template = document.createElement('template')

        template.innerHTML = view(event.payload)

        this.htmlContent = template.content.children.item(0)

        this.targetButton = this.htmlContent.querySelector('[role=target]')
        this.selfButton = this.htmlContent.querySelector('[role=self]')
        this.jsonDataButton = this.htmlContent.querySelector('[role=data]')

        this.timestamp = this.htmlContent.querySelector('[role=timestamp]')
    }

    setButtonHandlers() {

    }

    update(newEvent) {

    }
}
