"use client";

import Link from "next/link";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Logo } from "./logo";
import { ModeToggle } from "@/components/mode-toggle";

export const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();

  return (
    <div className={cn(
      "z-50 bg-background dark:bg-basedark fixed top-0 flex items-center w-full p-6",
      scrolled && "border-b shadow-sm"
    )}>
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {isLoading && (
          <div>Loading...</div>
        )}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size="sm">
                Get NbTion free
              </Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/documents">
                Enter NbTion
              </Link>
            </Button>
            <UserButton
              afterSignOutUrl="/"
            />
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  )
}