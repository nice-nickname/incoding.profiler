/**
 * Creating Guid
 * @returns string
 * @see http://guid.us/GUID/JavaScript
 */
export function uuidv4() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
}


/**
 * Converting jQuery array of element to array of selectors
 * @param {JQuery} elements
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
            el.setAttribute(PROFILER_ELEMENT_Id, uuidv4())
        }
        return el.getAttribute(PROFILER_ELEMENT_Id)
    }
}


/**
 * Converts html string to dom-element
 * @param {string} html
 * @returns {HTMLElement}
 */
export function stringToHtml(html) {
    let template = document.createElement('template')
    template.innerHTML = html

    return template.content.children.item(0)
}


/**
 * @constant attribute name to inspect "self" and "target" elements
 */
export const PROFILER_ELEMENT_Id = 'data-profiler-id'
