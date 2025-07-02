"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface UserAvatarProps {
  user: {
    name: string
    email: string
    avatar?: string
  }
  size?: "sm" | "md" | "lg"
  className?: string
}

export function UserAvatar({ user, size = "md", className }: UserAvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  }

  const getInitials = (name: string) => {
    return `${name.charAt(0)}`.toUpperCase()
  }

  return (
    <Avatar className={cn(sizeClasses[size], className)}>
      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={`${user.name}`} />
      <AvatarFallback className="bg-primary/10 text-primary font-semibold border-2 border-primary/20">
        {getInitials(user.name)}
      </AvatarFallback>
    </Avatar>
  )
}
