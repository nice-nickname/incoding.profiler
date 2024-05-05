import { html } from "lit"

const routes = {
    'events-profiler': () => html`<event-profiler-page></event-profiler-page>`,
    'preferences-page': () =>  html`<preferences-page></preferences-page>`
}


export type Page = keyof typeof routes

export default routes
