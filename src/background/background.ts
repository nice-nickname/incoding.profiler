import { keepBackgroundAlive } from "./persist-connection"
import { SessionFactory } from "./session-factory"

if (!__FIREFOX__) {
    keepBackgroundAlive()
}

const sessionTimeoutMs = 10 * 1000

chrome.runtime.onConnect.addListener((port: chrome.runtime.Port) => {
    let tab: string
    let name: string

    if (port.name === 'popup') {
        const session = SessionFactory.active
        session?.connect('popup', port)
        return
    }

    if (isDevtools(port)) {
        tab = port.name
        name = 'devtools'
    } else {
        // @ts-ignore
        tab = port.sender.tab.id.toString()
        name = port.name
    }

    const session = SessionFactory.create(tab)

    if (name === 'content-script') {
        session.cancelDispose()

        port.onDisconnect.addListener(() => {
            session.requestDispose(sessionTimeoutMs)
        })
    }

    session.connect(name, port)
})

chrome.tabs.onActivated.addListener((activeInfo) => {
    const tabId = activeInfo.tabId.toString()

    SessionFactory.setActive(tabId)
})

function isDevtools(port: chrome.runtime.Port) {
    return Number.isInteger(+port.name)
}
