import { TemplateResult, html } from "lit"

type Pages = {
    'events-profiler': () => TemplateResult,
    'preferences-page': () => TemplateResult
}

export type PageKey = keyof Pages

const routes: Pages = {
    'events-profiler': () => html`<event-list-page></event-list-page>`,
    'preferences-page': () =>  html`<preferences-page></preferences-page>`
}


export default routes
