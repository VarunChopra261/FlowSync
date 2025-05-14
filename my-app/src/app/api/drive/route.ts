import { google } from 'googleapis';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/src/lib/db';

export async function GET() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.OAUTH2_REDIRECT_URI
  );

  const authResult = await auth();
  const userId = authResult.userId;
  if (!userId) {
    return NextResponse.json({ message: 'User not found' });
  }

  const clerkUser = await clerkClient().then(client => client.users.getUser(userId));
  const publicMetadata = clerkUser.publicMetadata || {};
  const googleToken = publicMetadata['oauth_google'];

  if (!googleToken || typeof googleToken !== 'string') {
    return NextResponse.json({ message: 'Google OAuth token not found or invalid' });
  }

  const accessToken = googleToken;
  oauth2Client.setCredentials({
    access_token: accessToken,
  });

  const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
  });

  try {
    const response = await drive.files.list();

    if (response) {
      return Response.json(
        {
          message: response.data,
        },
        {
          status: 200,
        }
      );
    } else {
      return Response.json(
        {
          message: 'No files found',
        },
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    return Response.json(
      {
        message: 'Something went wrong',
      },
      {
        status: 500,
      }
    );
  }
}