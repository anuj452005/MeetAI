"use client"
import { authClient } from '@/lib/auth-client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const HomeView = () => {
  const [session, setSession] = React.useState<any>(null)
  const router = useRouter();

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
      <Button onClick={()=>authClient.signOut({fetchOptions:{onSuccess:()=> router.push('/sign-in')}})}>Sing out</Button>
         
    </div>
  )
}

export default HomeView
