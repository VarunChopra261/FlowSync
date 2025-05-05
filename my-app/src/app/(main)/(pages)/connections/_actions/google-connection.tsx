'use server'

import { auth } from '@clerk/nextjs/server'
import { clerkClient } from '@clerk/nextjs/server'
import { google } from 'googleapis'

export const getFileMetaData = async () => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.OAUTH2_REDIRECT_URI
  )

  const { userId } = await auth()

  if (!userId) {
    return { message: 'User not found' }
  }

  const clerk = await clerkClient()
  const clerkResponse = await clerk.users.getUserOauthAccessToken(
    userId,
    'google'
  )

  if (!clerkResponse.data.length) {
    return { message: 'No Google account connected' }
  }

  const accessToken = clerkResponse.data[0].token

  oauth2Client.setCredentials({
    access_token: accessToken,
  })

  const drive = google.drive({ version: 'v3', auth: oauth2Client })
  const response = await drive.files.list()

  if (response) {
    return response.data
  }
  
  return { message: 'No files found' }
}