'use server'

import { db } from "@/src/lib/db"
import { auth } from "@clerk/nextjs/server"

export const getGoogleListener = async () => {
    const authResult = auth()
    const userId = (await authResult)?.userId
  
    if (userId) {
      const listener = await db.user.findUnique({
        where: {
          clerkId: userId,
        },
        select: {
          googleResourceId: true,
        },
      })
  
      if (listener) return listener
    }
  }