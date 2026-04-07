// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cookies } from "next/headers";
import { AppSidebar } from "@/components/app-sidebar";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const inter = Inter({ subsets: ["latin"] });

// METADATA WORKS HERE because this file is a Server Component!
export const metadata: Metadata = {
  title: "Konveksi Stock Listing | Dashboard",
  description: "Internal dashboard for managing convection inventory listings.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookieStore = await cookies();
  const username = cookieStore.get('currentUser')?.value ?? "GUEST";
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={inter.className}>
        {/* SidebarProvider is a Client Component (imported). 
            Wrapping it here is how we combine state with a server layout. 
          */}
        <TooltipProvider delayDuration={0}>
          <SidebarProvider>

            {/* 1. The main Sidebar content (which we moved to its own file) */}
            <AppSidebar username={username} />

            {/* 2. SidebarInset automatically handles the content padding/width 
                 shifts when the sidebar expands or collapses.
            */}
            <SidebarInset>
              <main className="flex-1 p-6 lg:p-8">
                {children}
              </main>
            </SidebarInset>
          </SidebarProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}