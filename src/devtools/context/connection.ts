import { DevtoolsConnection } from "@connection/background-connection"
import { createContext } from "@lit/context"

const runtimeConnectionCtx = createContext<DevtoolsConnection>(Symbol('runtime-connection'))

export default runtimeConnectionCtx
