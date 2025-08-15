"use client"
import React, { useState } from 'react'
import { useSidebar } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { PanelLeftClose, PanelLeftIcon, Search, SearchIcon } from 'lucide-react'
import DashBoardCommand from './dashboard-command'

const DashBoardNavbar = () => {
  const { state, toggleSidebar, isMobile } = useSidebar();
  const [commandOpen, setCommandOpen] = useState(false);


    return (
    <>
      <DashBoardCommand open={commandOpen} setOpen={setCommandOpen} />
      <nav className="flex items-center gap-3 p-2">
        {/* Sidebar Toggle */}
        <Button
          onClick={toggleSidebar}
          className="bg-white text-black hover:bg-gray-100 shadow-sm"
        >
          {(state === "collapsed" || isMobile) ? <PanelLeftIcon /> : <PanelLeftClose />}
        </Button>

        {/* Search Bar Button */}
        <Button
        className="h-9 w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground"
        variant="outline"
        size="sm"
        onClick={() => setCommandOpen((open)=>!open)}
      >
        <SearchIcon className="mr-2 h-4 w-4" />
        <span>Search</span>
        <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 hidden sm:flex">
          <span className="text-xs">&amp;</span>
          <span className="text-xs">⌘</span>
          <span>K</span>
        </kbd>
      </Button>
      </nav>
    </>
  )
}

export default DashBoardNavbar
