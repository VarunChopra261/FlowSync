'use server'

import { db } from "@/src/lib/db"
import { currentUser, Client } from "@clerk/nextjs/server"

export const onNotionConnect = async (
    access_token: string,
    workspace_id: string,
    workspace_icon: string,
    workspace_name: string,
    database_id: string,
    id: string
  ) => {
    'use server'
    if (access_token) {
      //check if notion is connected
      const notion_connected = await db.notion.findFirst({
        where: {
          accessToken: access_token,
        },
        include: {
          connections: {
            select: {
              type: true,
            },
          },
        },
      })
  
      if (!notion_connected) {
        //create connection
        await db.notion.create({
          data: {
            userId: id,
            workspaceIcon: workspace_icon!,
            accessToken: access_token,
            workspaceId: workspace_id!,
            workspaceName: workspace_name!,
            databaseId: database_id,
            connections: {
              create: {
                userId: id,
                type: 'Notion',
              },
            },
          },
        })
      }
    }
  }
//   export const getNotionConnection = async () => {
//     const user = await currentUser()
//     if (user) {
//       const connection = await db.notion.findFirst({
//         where: {
//           userId: user.id,
//         },
//       })
//       if (connection) {
//         return connection
//       }
//     }
//   }
  