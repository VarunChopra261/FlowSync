import { ConnectionProviderProps } from "@/src/providers/connections-provider"
import { EditorState } from "@/src/providers/editor-provider"
import { useFlowSyncStore } from "@/src/store"
import ContentBasedOnTitle from "./content-based-on-title"

type Props = {
  state: EditorState
  nodeConnection: ConnectionProviderProps
}

const RenderOutputAccordion = ({ state, nodeConnection }: Props) => {
  const {
    googleFile,
    setGoogleFile,
    selectedSlackChannels,
    setSelectedSlackChannels,
  } = useFlowSyncStore()
  return (
    <ContentBasedOnTitle
      nodeConnection={nodeConnection}
      newState={state}
      file={googleFile}
      setFile={setGoogleFile}
      selectedSlackChannels={selectedSlackChannels}
      setSelectedSlackChannels={setSelectedSlackChannels}
    />
  )
}

export default RenderOutputAccordion

