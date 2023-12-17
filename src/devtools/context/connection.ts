import { createContext } from "@lit/context"
import { DevtoolsConnection } from "@connection/RuntimeConnection"

const runtimeConnectionCtx = createContext<DevtoolsConnection>(Symbol('runtime-connection'))

export default runtimeConnectionCtx
