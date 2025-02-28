'use client'

import React from 'react'
import { UserButton } from '@clerk/nextjs'

type UserMenuProps = {
  isSignedIn: boolean
}

export const UserMenu = ({ isSignedIn }: UserMenuProps) => {
  if (!isSignedIn) {
    return null
  }
  
  return <UserButton afterSignOutUrl="/" />
}
