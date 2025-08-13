import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Settings, LogOut, User, Loader2 } from "lucide-react"
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

const DashBoardUserButton = () => {
  const { data: session, isLoading } = authClient.useSession();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push('/sign-in');
          }
        }
      });
    } catch (error) {
      console.error('Logout failed:', error);
      // Fallback redirect
      router.push('/sign-in');
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="p-4 border-t bg-white">
        <div className="flex items-center space-x-3 p-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
          <div className="flex flex-col space-y-1">
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
            <div className="h-3 bg-gray-200 rounded w-32 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  // Show sign in if no session
  if (!session) {
    return (
      <div className="p-4 border-t bg-white">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => router.push('/sign-in')}
        >
          Sign In
        </Button>
      </div>
    );
  }

  const user = session.user;
  const initials = user.name 
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : user.email.slice(0, 2).toUpperCase();

  return (
    <div className="p-4 border-t bg-white">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className="w-full justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="flex items-center space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user.image} alt={user.name || user.email} />
                <AvatarFallback className="bg-green-100 text-green-700 text-sm font-medium">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium text-gray-900">
                  {user.name || 'User'}
                </span>
                <span className="text-xs text-gray-500">
                  {user.email}
                </span>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          className="w-56" 
          align="end" 
          forceMount
          side="top"
        >
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user.name || 'User'}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="cursor-pointer text-red-600 focus:text-red-600"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default DashBoardUserButton
