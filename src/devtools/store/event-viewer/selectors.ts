import { RootState } from "..";

const selectSelectedJsonData = (state: RootState) => state.eventViewer.selected || null

export { selectSelectedJsonData };
