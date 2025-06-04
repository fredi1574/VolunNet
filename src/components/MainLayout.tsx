"use client";

import { usePathname } from "next/navigation";
import { AppSidebar } from "./SidebarMenu";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();

  const noSidebarRoutes = ["/login", "/register"];
  const shouldShowSidebar = !noSidebarRoutes.includes(pathname);

  return (
    <SidebarProvider>
      {shouldShowSidebar && <AppSidebar />}
      <main className="flex-1">
        {shouldShowSidebar && <SidebarTrigger />}
        <div className={shouldShowSidebar ? "p-4 md:p-6 lg:p-8" : ""}>
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
