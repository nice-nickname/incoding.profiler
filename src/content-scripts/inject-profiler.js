/**
 * injected-script
 *
 * Script to intercept executing messages from incoding.framework and pass them to content-script
 */

/* eslint-disable */

let MESSAGE_ID = 0

function interceptExecute(current, state) {
    current.target = current.getTarget();
    current.internalExecute(state);
}

if (ExecutableBase != undefined) {
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
}
