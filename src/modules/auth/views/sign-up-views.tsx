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

const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string().min(8, { message: "Please confirm your password" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

const SignUpView = () => {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = React.useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await authClient.signUp.email(
        {
          email: values.email,
          password: values.password,
          name: values.name,
        },
        {
          onSuccess: (ctx) => {
            console.log("Signup successful")
            router.push("/sign-in")
          },
          onError: (ctx) => {
            setErrorMessage(ctx.error.message)
          },
        }
      )
    } catch (error: any) {
      setErrorMessage(error?.message || "Sign-up failed")
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Section - Sign Up Form */}
      <div className="flex-1 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Create account</h1>
            <p className="text-gray-600">Sign up to get started</p>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Full Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your full name"
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Confirm Password</FormLabel>
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

              {/* Sign Up Button */}
              <Button type="submit" className="w-full h-11 bg-black hover:bg-gray-800 text-white">
                Create account
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

          {/* Social Sign Up Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-11 bg-gray-50 hover:bg-gray-100 border-gray-200">
              Google
            </Button>
            <Button variant="outline" className="h-11 bg-gray-50 hover:bg-gray-100 border-gray-200">
              Github
            </Button>
          </div>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/sign-in" className="text-black font-medium hover:underline">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>

  
    </div>
  )
}

export default SignUpView
