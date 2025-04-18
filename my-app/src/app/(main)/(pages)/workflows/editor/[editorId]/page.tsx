import { ConnectionsProvider } from '@/src/providers/connections-provider'
import EditorProvider from '@/src/providers/editor-provider'
import React from 'react'
import EditorCanvas from './_components/editor-canvas'

type Props = {}

const page = (props: Props) => {
  return (
    <div className='h-full'>
        <EditorProvider>
            <ConnectionsProvider>
                <EditorCanvas />
            </ConnectionsProvider>
        </EditorProvider>
    </div>
  )
}

export default page