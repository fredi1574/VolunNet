import { AppSidebar } from "./SidebarMenu";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1">
        <SidebarTrigger />
        <div className="p-4 md:p-6 lg:p-8">{children}</div>
      </main>
    </SidebarProvider>
  );
}
