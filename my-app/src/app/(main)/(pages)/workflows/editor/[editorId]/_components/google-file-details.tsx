import { Card, CardContent, CardDescription } from "@/src/components/ui/card"
import { onAddTemplate } from "@/src/lib/editor-utils"
import { ConnectionProviderProps } from "@/src/providers/connections-provider"
import React from 'react'
interface GoogleFile {
  kind: string
  name: string
  mimeType: string
  id?: string
  [key: string]: any
}

type Props = {
  nodeConnection: ConnectionProviderProps
  title: string
  gFile: GoogleFile
}

const isGoogleFileNotEmpty = (file: GoogleFile): boolean => {
  return Object.keys(file).length > 0 && file.kind !== ''
}

const GoogleFileDetails = ({ gFile, nodeConnection, title }: Props) => {
  if (!isGoogleFileNotEmpty(gFile)) {
    return null
  }

  const details = ['kind', 'name', 'mimeType']
  if (title === 'Google Drive') {
    details.push('id')
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Card>
        <CardContent className="flex flex-wrap gap-2 p-4">
          {details.map((detail) => (
            <div
              key={detail}
              onClick={() =>
                onAddTemplate(nodeConnection, title, gFile[detail])
              }
              className="flex cursor-pointer gap-2 rounded-full bg-white px-3 py-1 text-gray-500"
            >
              {detail}:{' '}
              <CardDescription className="text-black">
                {gFile[detail]}
              </CardDescription>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default GoogleFileDetails