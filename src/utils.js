/**
 * Creating Guid
 * @returns string
 * @see http://guid.us/GUID/JavaScript
 */
function _uuidv4() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
}

export const uuidv4 = crypto.randomUUID || _uuidv4

export const PROFILER_ELEMENT_Id = 'data-profiler-id'

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
        result.push(toSelector(element))
    }

    return result

    function toSelector(el) {
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
