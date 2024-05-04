import { DevtoolsConnection } from "@connection/RuntimeConnection"
import { createContext } from "@lit/context"

const runtimeConnectionCtx = createContext<DevtoolsConnection>(Symbol('runtime-connection'))

export default runtimeConnectionCtx
