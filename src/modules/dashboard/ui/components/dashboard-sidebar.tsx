"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { BotIcon, VideoIcon, StarIcon } from "lucide-react";
import DashBoardUserButton from "./dashboard-user-button";

const firstSection = [
  { icon: VideoIcon, label: "Meetings", href: "/meetings" },
  { icon: BotIcon, label: "Agent", href: "/agents" },
];

const secondSection = [
  { icon: StarIcon, label: "Upgrade", href: "/upgrade" },
];

const DashboardSidebar = () => {
  return (
    <Sidebar className="w-64 border-r bg-gradient-to-b from-white to-gray-50 shadow-sm flex flex-col h-screen">
      {/* Header */}
      <SidebarHeader className="p-5 border-b bg-gradient-to-r from-green-600 to-green-500 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shadow-md">
            <svg
              className="w-6 h-6 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 
                10-10S17.52 2 12 2zm-2 15l-5-5 
                1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <span className="font-semibold text-lg text-white">Meet.AI</span>
        </div>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="p-4 flex-1 overflow-y-auto">
        {/* First Section */}
        <SidebarGroup>
          <h4 className="text-xs uppercase tracking-wider text-gray-500 mb-2">
            Main
          </h4>
          <SidebarGroupContent>
            <SidebarMenu>
              {firstSection.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.href}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-green-50 hover:text-green-700 transition-colors group"
                    >
                      <item.icon className="w-5 h-5 text-gray-500 group-hover:text-green-600 transition-colors" />
                      <span className="text-gray-700 group-hover:text-green-700 font-medium">
                        {item.label}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Second Section */}
        <SidebarGroup className="mt-8">
          <h4 className="text-xs uppercase tracking-wider text-gray-500 mb-2">
            Account
          </h4>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondSection.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.href}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-yellow-50 hover:bg-yellow-100 transition-colors group"
                    >
                      <item.icon className="w-5 h-5 text-yellow-600" />
                      <span className="text-yellow-700 font-semibold">
                        {item.label}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      {/* User Button - Fixed at bottom */}
      <div className="flex-shrink-0">
        <DashBoardUserButton />
      </div>
    </Sidebar>
  );
};

export default DashboardSidebar;
