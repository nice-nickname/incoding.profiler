import { Peer } from "@connection/types"
import { keepBackgroundAlive } from "./persist-connection"
import { Session, SessionFactory } from "./session"

if (!__FIREFOX__) {
    keepBackgroundAlive()
}

chrome.runtime.onConnect.addListener((port: chrome.runtime.Port) => {
    let sessionId: string
    let peer: Peer

    if (isDevtools(port)) {
        sessionId = port.name
        peer = 'devtools'
    } else {
        sessionId = port.sender?.tab?.id?.toString()!
        peer = port.name as Peer
    }

    const session: Session = SessionFactory.get(sessionId)

    session.connect(peer, port)
})

function isDevtools(port: chrome.runtime.Port) {
    return Number.isInteger(+port.name)
}
