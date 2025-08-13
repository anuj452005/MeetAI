import React from 'react'
import { Card } from '@/components/ui/card'
import SingInView from '@/modules/auth/views/sign-in-views'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import {auth} from "@/lib/auth"

const page =async () => {
  console.log("singin page")
  const session =await auth.api.getSession({
    headers:await headers()
  });

  if(!session){
    redirect("/");
  }
  return (
    
    <SingInView/>
    
  )
}

export default page



