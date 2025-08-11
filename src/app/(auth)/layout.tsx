import React from 'react'

interface Props {
  children: React.ReactNode
}

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <div className="w-full max-w-md p-8 rounded-xl shadow-lg bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800">
        {children}
      </div>
    </div>
  )
}

export default AuthLayout
