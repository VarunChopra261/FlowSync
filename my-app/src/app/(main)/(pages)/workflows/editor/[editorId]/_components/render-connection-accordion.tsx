'use client'
import { AccordionContent } from "@/components/ui/accordion"
import { useNodeConnections } from "@/src/providers/connections-provider"
import { EditorState } from "@/src/providers/editor-provider"
import { Connection } from "@/src/lib/types"
import React from 'react'
import ConnectionCard from "../../../../connections/_components/connection-card"
import { useFlowSyncStore } from "@/src/store"
import MultipleSelector from "@/src/components/ui/multiple-selector"
const RenderConnectionAccordion = ({
    connection,
    state,
  }: {
    connection: Connection
    state: EditorState
  }) => {
    const {
      title,
      image,
      description,
      connectionKey,
      accessTokenKey,
      alwaysTrue,
      slackSpecial,
    } = connection  
    const {nodeConnection}=useNodeConnections()
    const { slackChannels, selectedSlackChannels, setSelectedSlackChannels } =
    useFlowSyncStore()
    const connectionData = (nodeConnection as any)[connectionKey]
    const isConnected =
    alwaysTrue ||
    (nodeConnection[connectionKey] &&
      accessTokenKey &&
      connectionData[accessTokenKey!])
    return (
        <AccordionContent key={title}>
          {state.editor.selectedNode.data.title === title && (
            <>
              <ConnectionCard
                title={title}
                icon={image}
                description={description}
                type={title}
                connected={{ [title]: isConnected }}
              />
              {slackSpecial && isConnected && (
                <div className="p-6">
                  {slackChannels?.length ? (
                    <>
                      <div className="mb-4 ml-1">
                        Select the slack channels to send notification and messages:
                      </div>
                      <MultipleSelector
                        value={selectedSlackChannels}
                        onChange={setSelectedSlackChannels}
                        defaultOptions={slackChannels}
                        placeholder="Select channels"
                        emptyIndicator={
                          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                            no results found.
                          </p>
                        }
                      />
                    </>
                  ) : (
                    'No Slack channels found. Please add your Slack bot to your Slack channel'
                  )}
                </div>
              )}
            </>
          )}
        </AccordionContent>
      )
}

export default RenderConnectionAccordion    