'use client'
import { Card } from '@/src/components/ui/card'
import { CardHeader, CardTitle, CardDescription } from '@/src/components/ui/card'
import { EditorCanvasDefaultCardTypes, CONNECTIONS } from '@/src/lib/constant'
import { EditorCanvasTypes } from '@/src/lib/types'
import { useNodeConnections } from '@/src/providers/connections-provider'
import { useEditor } from '@/src/providers/editor-provider'
import { Separator } from '@radix-ui/react-separator'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs'
import React, { useEffect } from 'react'
import EditorCanvasIconHelper from './editor-canvas-card-icon-helper'
import { onDragStart } from '@/src/lib/editor-utils'


type Props = {
  nodes: Node[]
}

const EditorCanvasSidebar = ({ nodes }: Props) => {
    const { state } = useEditor()
    const { nodeConnection } = useNodeConnections()
    return (
      <aside>
        <Tabs
          defaultValue="actions"
          className="h-screen overflow-scroll pb-24"
        >
          <TabsList className="bg-transparent">
            <TabsTrigger value="actions">Actions</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <Separator />
          <TabsContent
            value="actions"
            className="flex flex-col gap-4 p-4"
          >
            {Object.entries(EditorCanvasDefaultCardTypes)
              .filter(
                ([_, cardType]) =>
                  (!nodes.length && cardType.type === 'Trigger') ||
                  (nodes.length && cardType.type === 'Action')
              )
              .map(([cardKey, cardValue]) => (
                <Card
                  key={cardKey}
                  draggable
                  className="w-full cursor-grab border-black bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900"
                  onDragStart={(event: any) =>
                    onDragStart(event, cardKey as EditorCanvasTypes)
                  }
                >
                  <CardHeader className="flex flex-row items-center gap-4 p-4">
                    <EditorCanvasIconHelper type={cardKey as EditorCanvasTypes} />
                    <CardTitle className="text-md">
                      {cardKey}
                      <CardDescription>{cardValue.description}</CardDescription>
                    </CardTitle>
                  </CardHeader>
                </Card>
              ))}
          </TabsContent>
        </Tabs>
      </aside>
    )
  }
  
  export default EditorCanvasSidebar