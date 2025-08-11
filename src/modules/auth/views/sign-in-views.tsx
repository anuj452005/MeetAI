"use client"
import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { authClient } from '@/lib/auth-client'
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { AlertCircle } from "lucide-react"

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { toast } from 'sonner'

const formSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
})

const SignInView = () => {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = React.useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await authClient.signIn.email({
        email: values.email,
        password: values.password
      })
      console.log("form submitted")
      router.push("/")
    } catch (error: any) {
      setErrorMessage(error?.message || "Sign-in failed")
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Section - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
            <p className="text-gray-600">Login to your account</p>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Email</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="m@example.com"
                        className="h-11"
                        suppressHydrationWarning
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="••••••••"
                        className="h-11"
                        suppressHydrationWarning
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Error Message */}
              {errorMessage && (
                <Alert className="bg-red-50 border-red-200">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-600">{errorMessage}</AlertDescription>
                </Alert>
              )}

              {/* Sign In Button */}
              <Button type="submit" className="w-full h-11 bg-black hover:bg-gray-800 text-white">
                Sign in
              </Button>
            </form>
          </Form>

          {/* Separator */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">OR CONTINUE WITH</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button
            onClick={()=>{
                authClient.signIn.social({
                    provider:"google"
                })
            }}
             variant="outline" className="h-11 bg-gray-50 hover:bg-gray-100 border-gray-200">
              Google
            </Button>
            <Button  onClick={()=>{
                authClient.signIn.social({
                    provider:"github"
                })
            }}
             variant="outline" className="h-11 bg-gray-50 hover:bg-gray-100 border-gray-200">
              Github
            </Button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="/sign-up" className="text-black font-medium hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>

    
    </div>
  )
}

export default SignInView
