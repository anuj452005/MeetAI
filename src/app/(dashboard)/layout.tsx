import React from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'
import DashboardSidebar from "@/modules/dashboard/ui/components/dashboard-sidebar"
import DashBoardNavbar from '@/modules/dashboard/ui/components/dashboard-navbar'

interface Props {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <main className="flex-1">
          <DashBoardNavbar/>
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}

export default Layout
