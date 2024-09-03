import { Session } from "./session";

export class SessionFactory {

    private static sessions: Record<string, Session> = { }

    private static activeSession: Session

    static create(tabId: string): Session {
        if (this.sessions[tabId] == null) {
            this.sessions[tabId] = new Session(tabId)
        }

        return this.sessions[tabId]
    }
}
