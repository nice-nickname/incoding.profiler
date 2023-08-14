/**
 * injected-script
 *
 * Script to intercept executing messages from incoding.framework and pass them to content-script
 */

import { jqueryToSelector, uuidv4 } from "../utils"

/* eslint-disable */

let MESSAGE_ID = 0

function message(current, name) {
    return {
        id: MESSAGE_ID,
        name: name,
        payload: {
            timestamp: performance.now(),
            data: current.jsonData,
            event: current.event.type,
            action: current.name,
            self: jqueryToSelector(current.self),
            target: jqueryToSelector(current.target)
        }
    }
}


function interceptExecute(current, state) {
    window.postMessage(message(current, 'execute-start'))

    current.target = current.getTarget();

    current.internalExecute(state);

    window.postMessage(message(current, 'execute-finish'))
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
