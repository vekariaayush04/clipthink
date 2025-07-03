"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "@/lib/auth-client"; // import the auth client
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Menu, Transition } from "@/components/ui/menubar";
import { ChevronDown, CreditCard, Link } from "lucide-react";
import { useRouter } from "next/navigation";
import { ProfileDropdown } from "./profile.dropdown";
import { axiosInstance } from "@/lib/Axios";

export function Navbar() {
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = useSession();
  const router = useRouter();

  return (
    <>
      <nav className="flex items-center justify-between p-3 bg-background">
        <div className="flex items-center ml-4 justify-center gap-4">
          <Link href="/" className="text-xl font-bold">
            Clipthink
          </Link>
          <div className="text-lg font-semibold">ClipThink</div>
        </div>

        {!session && (
          <div className="flex items-center gap-4">
            <Button
              className="text-md font-normal dark:bg-transparent hover:bg-transparent shadow-none"
              onClick={() => router.push("/auth")}
            >
              Login
            </Button>
            <Button
              className="text-md font-normal"
              onClick={() => router.push("/auth")}
            >
              Sign Up
            </Button>
          </div>
        )}

        {session && (
          <div className="flex items-center gap-6 mr-3">
            {/* display remaining credits */}
            {/* //make more better ui for credits */}
            <div className="text-md border border-secondary p-2 px-4 rounded-xl text-muted-foreground flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Credits : {session.user.credits}
            </div>
            {/* Profile Dropdown */}
            <ProfileDropdown user={session.user} />
          </div>
        )}
      </nav>
    </>
  );
}

function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 rounded-md border border-border bg-transparent px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-muted/10 dark:border-muted dark:text-muted dark:hover:bg-muted/20"
    >
      <span>Docs</span>
      <ChevronDown className="h-4 w-4" />
    </Link>
  );
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
