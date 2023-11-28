import { RootState } from "..";

const selectSelectedJsonData = (state: RootState) => state.eventViewer.selected?.jsonData || null

export { selectSelectedJsonData }
