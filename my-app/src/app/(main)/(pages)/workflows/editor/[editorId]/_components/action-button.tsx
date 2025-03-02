
import { ConnectionProviderProps } from '@/src/providers/connections-provider'
import { Option } from './content-based-on-title'
import React,{useCallback} from 'react'
type Props = {
    currentService: string
    nodeConnection: ConnectionProviderProps
    channels?: Option[]
    setChannels?: (value: Option[]) => void
  }
  const ActionButton = ({
    currentService,
    nodeConnection,
    channels,
    setChannels,
  }: Props) => {
    return <div>ActionButton</div>
  }
export default ActionButton