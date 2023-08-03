/**
 * injected-script
 *
 * Script to intercept executing messages from incoding.framework and pass them to content-script
 */

let MSG_ID = 0

function getPayloadFromCurrent(current) {
    return {
        jsonData: current.jsonData,
        // self: current.self,
        // target: current.target,
        onBind: current.onBind
    }
}

function interceptExecute(current, state) {
    const messageId = MSG_ID++

    window.postMessage({
        messageId: messageId,
        name: 'inc-execute',
        timestamp: performance.now(),
        state: 'execute-start',
        payload: getPayloadFromCurrent(current)
    }, '*')

    current.target = current.getTarget();
    current.internalExecute(state);

    window.postMessage({
        messageId: messageId,
        name: 'inc-execute',
        timestamp: performance.now(),
        state: 'execute-finish',
        payload: getPayloadFromCurrent(current)
    }, '*')
}


ExecutableBase.prototype.execute = function(state) {
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
