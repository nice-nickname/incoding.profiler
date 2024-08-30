import { nanoid } from "nanoid";


/**
 * @returns string
 * @see http://guid.us/GUID/JavaScript
 */
export function uuid() {
    return nanoid(10)
}


/**
 * Converting jQuery array of element to array of selectors
 * @param {JQuery} elements
 * @returns {string[]}
 */
export function jqueryToSelector(elements) {
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


/**
 * @constant attribute name to inspect "self" and "target" elements
 */
export const PROFILER_ELEMENT_Id = 'data-profiler-id'
