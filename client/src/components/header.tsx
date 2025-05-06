import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Link, useLocation } from 'wouter';
import { 
  Heart, 
  Save, 
  Image, 
  User, 
  ChevronDown, 
  LogOut,
  Settings
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Header() {
  const { user, logoutMutation } = useAuth();
  const [location, navigate] = useLocation();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const getUserInitial = (username: string) => {
    return username.charAt(0).toUpperCase();
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Heart className="h-6 w-6 text-primary mr-2 fill-primary" />
          <h1 className="text-xl font-poppins font-semibold text-primary">HeartDraw</h1>
        </Link>
        
        {user ? (
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="heart-btn bg-primary/10 hover:bg-primary/20 text-primary rounded-full" 
              title="Save Heart"
            >
              <Save className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="heart-btn bg-primary/10 hover:bg-primary/20 text-primary rounded-full" 
              title="My Gallery"
            >
              <Image className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 focus:outline-none">
                  <Avatar className="h-8 w-8 bg-secondary text-white">
                    <AvatarFallback>{getUserInitial(user.username)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium hidden md:inline">{user.username}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>My Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Image className="mr-2 h-4 w-4" />
                  <span>My Gallery</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="cursor-pointer text-destructive focus:text-destructive" 
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex gap-3">
            <Button 
              variant="ghost" 
              className="text-sm font-medium text-neutral-800 hover:text-primary transition-colors"
              onClick={() => navigate('/auth')}
            >
              Login
            </Button>
            <Button 
              className="bg-primary text-white hover:bg-accent transition-colors rounded-full"
              onClick={() => navigate('/auth')}
            >
              Sign Up
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
