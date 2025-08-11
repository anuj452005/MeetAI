"use client"
import { authClient } from '@/lib/auth-client'
import React from 'react'

const page = () => {
  const [session, setSession] = React.useState<any>(null)

  React.useEffect(() => {
    const getSession = async () => {
      const result = await authClient.getSession()
      if (result.data) {
        setSession(result.data)
      }
    }
    getSession()
  }, [])

  if (!session) {
    return <div>Loading...</div>
  }

  return (
    <div>
      User is logged in as {session.user.name}
    </div>
  )
}

export default page
