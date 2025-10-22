/**
 * injected-script
 *
 * Script to intercept executing messages from incoding.framework and pass them to content-script
 */

/* eslint-disable */
import { nanoid } from "nanoid";

if (window.ExecutableBase != undefined) {
    window.ExecutableBase.prototype.execute = function(state) {
        var current = this;
        this.target = this.getTarget();

        if (!this.isValid()) {
            return;
        }

        var delayExecute = function() {
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

    function interceptExecute(current, state) {
        const messageId = uuid()

        window.postMessage({
            type: 'event-execution:start',
            payload: {
                uuid: messageId,
                action: current.name,
                eventName: current.event.type,
                jsonData: current.jsonData,
                self: convertJqueryToTag(current.self)?.[0],
                target: convertJqueryToTag(current.target)
            }
        })

        const tick = performance.now()

        current.target = current.getTarget();
        current.internalExecute(state);

        const tock = performance.now()

        window.postMessage({
            type: 'event-execution:finish',
            payload: {
                uuid: messageId,
                executionTimeMs: tock - tick,
                jsonData: current.jsonData
            }
        })
    }
}

const PROFILER_ELEMENT_Id = 'data-profiler-id'

/**
 * @param { JQuery } elements
 * @returns { string[] }
 */
function convertJqueryToTag(elements) {
    const result = []

    if (!elements) {
        return result
    }

    for (const element of elements.get()) {
        let selector = toSelector(element)

        if (selector) {
            result.push(selector)
        }
    }

    return result

    function toSelector(el) {
        if (!('hasAttribute' in el)) {
            return null
        }

        if (!el.hasAttribute(PROFILER_ELEMENT_Id)) {
            el.setAttribute(PROFILER_ELEMENT_Id, uuid())
        }
        return {
            profilerId: el.getAttribute(PROFILER_ELEMENT_Id),
            classes: Array.from(el.classList),
            id: el.id,
            tagName: el.tagName.toLowerCase()
        }
    }
}

function uuid() {
    return nanoid(10)
}
