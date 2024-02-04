/**
 * devtools
 *
 * Establish background connection and handle events
 */


import "@devtools/app"
import { html, render } from "lit"

const root = document.getElementById('root')!

render(html`<incoding-profiler-devtools></incoding-profiler-devtools>`, root)
