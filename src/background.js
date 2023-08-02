/**
 * Background serivice-worker for message exchanging
 */

async function dynamiclyInjectContentScript() {
    const scriptsToInject = [
        {
            id: 'inject-profiler',
            matches: ['<all_urls>'],
            js: ['content_script.js'],
            world: 'MAIN',
            runAt: 'document_end'
        }
    ]

    try {
        await chrome.scripting.unregisterContentScripts()
        await chrome.scripting.registerContentScripts(scriptsToInject)
    }
    catch (error) {
        console.error(error)
    }
}

dynamiclyInjectContentScript()
