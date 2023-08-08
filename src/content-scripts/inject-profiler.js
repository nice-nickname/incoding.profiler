/**
 * injected-script
 *
 * Script to intercept executing messages from incoding.framework and pass them to content-script
 */

import { uuidv4 } from "../utils"

/* eslint-disable */

let MESSAGE_ID = 0

class IncodingMessage {

    constructor(name, current, timestamp) {
        this.id = MESSAGE_ID
        this.name = name
        this.payload = {
            timestamp: timestamp,
            data: current.jsonData,
            event: current.event.type,
            action: current.name,
            self: this.htmlElementToSelector(current.self),
            target: this.htmlElementToSelector(current.target)
        }
    }

    htmlElementToSelector(jquery) {
        const objectIdAttr = 'data-profiler-id'

        if (!jquery || jquery.length === 0) {
            return ''
        }

        const element = jquery[0]

        if (!element || document.isSameNode(element)) {
            return ''
        }

        if (!element.hasAttribute(objectIdAttr)) {
            element.setAttribute(objectIdAttr, uuidv4())
        }

        const objectId = element.getAttribute(objectIdAttr)

        return `[${objectIdAttr}='${objectId}']`
    }
}

function interceptExecute(current, state) {
    window.postMessage(new IncodingMessage('execute-start', current))

    current.target = current.getTarget();

    let tick = performance.now()
    current.internalExecute(state);
    let tock = performance.now()

    window.postMessage(new IncodingMessage('execute-finish', current, tock - tick))
    MESSAGE_ID++
}

if (window.ExecutableBase != undefined) {
    window.ExecutableBase.prototype.execute = function (state) {
        var current = this;
        this.target = this.getTarget();

        if (!this.isValid()) {
            return;
        }

        var delayExecute = function () {
            interceptExecute(current, state)
        };

        if (this.timeOut > 0) {
            window.setTimeout(delayExecute, current.timeOut);
            return;
        }
        if (this.interval > 0) {
            ExecutableBase.IntervalIds[current.intervalId] = window.setInterval(delayExecute, current.interval);
            return;
        }

        interceptExecute(current, state)
    }
}
