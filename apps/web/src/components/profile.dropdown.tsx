"use client";

import { useState } from "react";
import { LogOut, Settings, User, HelpCircle, Bell } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "./user-avatar";
import { signOut, useSession } from "@/lib/auth-client";

interface ProfileDropdownProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  onLogout?: () => void;
}

export function ProfileDropdown({ user }: ProfileDropdownProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    // Simulate logout process
    try {
      await signOut();
      router.push("/auth");
    } catch (err) {
      console.error("Error during sign out:", err);
    }
    setIsLoading(false);
  };

  const menuItems = [
    // {
    //   icon: User,
    //   label: "Profile",
    //   onClick: () => router.push("/profile"),
    // },
    // {
    //   icon: Settings,
    //   label: "Settings",
    //   onClick: () => router.push("/settings"),
    // },
    // {
    //   icon: Bell,
    //   label: "Notifications",
    //   onClick: () => router.push("/notifications"),
    // },
    // {
    //   icon: HelpCircle,
    //   label: "Help & Support",
    //   onClick: () => router.push("/help"),
    // },
    {},
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full hover:bg-accent/50 transition-all duration-200 hover:scale-105"
        >
          <UserAvatar user={user as any} size="md" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-64 p-2 bg-card/95 backdrop-blur-sm border-border/50 shadow-xl"
        align="end"
        forceMount
      >
        {/* User Info Header */}
        <DropdownMenuLabel className="p-3 bg-muted/30 rounded-lg mb-2">
          <div className="flex items-center gap-3">
            <UserAvatar user={user as any} size="md" />
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-semibold leading-none">{user.name}</p>
              <p className="text-xs text-muted-foreground leading-none">
                {user.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="my-2" />

        {/* Menu Items */}
        {/* <div className="space-y-1">
          {menuItems.map((item, index) => (
            <DropdownMenuItem
              key={index}
              onClick={item.onClick}
              className="flex items-center gap-3 p-3 rounded-md cursor-pointer hover:bg-accent/50 transition-colors duration-200"
            >
              <item.icon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{item.label}</span>
            </DropdownMenuItem>
          ))}
        </div> */}

        {/* <DropdownMenuSeparator className="my-2" /> */}

        {/* Logout Button */}
        <DropdownMenuItem
          onClick={handleLogout}
          disabled={isLoading}
          className="flex items-center gap-3 p-3 rounded-md cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors duration-200 focus:bg-destructive/10 focus:text-destructive"
        >
          {isLoading ? (
            <div className="h-4 w-4 border-2 border-destructive/30 border-t-destructive rounded-full animate-spin" />
          ) : (
            <LogOut className="h-4 w-4" />
          )}
          <span className="text-sm font-medium">
            {isLoading ? "Signing out..." : "Sign out"}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
