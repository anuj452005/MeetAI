import React from 'react'
import  SignUpView from '@/modules/auth/views/sign-up-views'
import {auth} from "@/lib/auth"
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
const page =async () => {
  console.log("singin pages")
  const session =await auth.api.getSession({
    headers:await headers()
  });

  if(!!session){
    redirect("/");
  }
  return (
   <SignUpView/>
  )
}

export default page
