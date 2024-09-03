/**
 * injected-script
 *
 * Script to intercept executing messages from incoding.framework and pass them to content-script
 */

import { jqueryToSelector, uuid } from "./utils"

/* eslint-disable */

function interceptExecute(current, state) {
    const messageId = uuid()

    window.postMessage({
        type: 'event-execution-start',
        payload: {
            uuid: messageId,
            action: current.name,
            eventName: current.event.type,
            jsonData: current.jsonData,
            self: jqueryToSelector(current.self)[0],
            target: jqueryToSelector(current.target)
        }
    })

const tick = performance.now()

    current.target = current.getTarget();
    current.internalExecute(state);

const tock = performance.now()

    window.postMessage({
        type: 'event-execution-finish',
        payload: {
            uuid: messageId,
            executionTimeMs: tock - tick,
            jsonData: current.jsonData
        }
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
