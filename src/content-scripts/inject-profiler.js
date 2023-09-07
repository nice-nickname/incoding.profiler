/**
 * injected-script
 *
 * Script to intercept executing messages from incoding.framework and pass them to content-script
 */

import sendMessage from "../messages/messages"
import { jqueryToSelector, uuidv4 } from "../utils"

/* eslint-disable */

function interceptExecute(current, state) {
    const messageId = uuidv4()

    sendMessage(window, 'execute-start', {
        uuid: messageId,
        action: current.name,
        eventName: current.event.type,
        jsonData: current.jsonData,
        self: jqueryToSelector(current.self),
        target: jqueryToSelector(current.target)
    })

const tick = performance.now()

    current.target = current.getTarget();
    current.internalExecute(state);

const tock = performance.now()

    sendMessage(window, 'execute-finish', {
        uuid: messageId,
        executionTimeMs: tock - tick,
        jsonData: current.jsonData
    })
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
