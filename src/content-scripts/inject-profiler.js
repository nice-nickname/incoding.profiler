/**
 * Script to inject interceptions of executing messages from incoding.framework
 */

let EVENT_ID = 0

function interceptExecute(current, state) {
    const eventId = EVENT_ID++

    window.postMessage({
        name: 'inc-execute-start',
        eventId: eventId,
        timestamp: performance.now(),
        payload: state
    })

    current.target = current.getTarget();
    current.internalExecute(state);

    window.postMessage({
        name: 'inc-execute-finish',
        eventId: eventId,
        timestamp: performance.now(),
        payload: state
    })
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
