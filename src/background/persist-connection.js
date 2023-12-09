/**
 * background.js tries to go inactive if no actions is perfomed by service_worker,
 * so by that, we'll try to keep him alive by constantly running some actions
 * @see https://developer.chrome.com/docs/extensions/migrating/to-service-workers
 */

let keepingAliveInterval

function keepBackgroundAlive() {
    keepingAliveInterval = setInterval(ping, 5 * 1000)

    return function killBackground() {
        clearInterval(keepingAliveInterval)
    }
}


async function ping() {
    await chrome.storage.local.set({ '_': 'pong' + Date.now() })
}


export {
    keepBackgroundAlive
}
