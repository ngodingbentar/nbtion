"use client";

import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";

import { Spinner } from "@/components/spinner";
// import { SearchCommand } from "@/components/search-command";

import Navigation from "./_components/navigation";
import { Toaster } from "sonner";

const MainLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }

  return ( 
    <div className="h-full flex dark:bg-basedark">
      <Navigation />
      <main className="flex-1 h-full overflow-y-auto">
        {/* <SearchCommand /> */}
        <Toaster position="bottom-center" />
        {children}
      </main>
    </div>
   );
}
 
export default MainLayout;