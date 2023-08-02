/**
 * Script to inject interceptions of executing messages from incoding.framework
 */
let MSG_ID = 0

function interceptExecute(current, state) {
    const eventId = MSG_ID++

    window.postMessage({
        messageId: MSG_ID,
        name: 'inc-execute',
        timestamp: performance.now(),
        state: 'execute_start',
        payload: {a: 123}
    }, '*')

    current.target = current.getTarget();
    current.internalExecute(state);

    window.postMessage({
        messageId: MSG_ID++,
        name: 'inc-execute',
        timestamp: performance.now(),
        state: 'execute_finish',
        payload: {a: 123}
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
