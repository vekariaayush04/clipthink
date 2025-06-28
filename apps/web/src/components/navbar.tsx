"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Menu, Transition } from "@/components/ui/menubar";
import { ChevronDown, Link } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    <nav className="flex items-center justify-between p-3 bg-background">
      <div className="flex items-center ml-4 justify-center gap-4">
        <Link href="/" className="text-xl font-bold">
          Clipthink
        </Link>
        <div className="text-lg font-semibold">
            ClipThink
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button className="text-md font-normal dark:bg-transparent hover:bg-transparent shadow-none">
            Login
        </Button>
        <Button className="text-md font-normal">
            Sign Up
        </Button>
      </div>

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