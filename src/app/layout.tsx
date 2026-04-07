// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import Sidebar from "@/components/app-sidebar";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const inter = Inter({ subsets: ["latin"] });

// METADATA WORKS HERE because this file is a Server Component!
export const metadata: Metadata = {
  title: "Konveksi Stock Listing | Dashboard",
  description: "Internal dashboard for managing convection inventory listings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={inter.className}>
        {/* SidebarProvider is a Client Component (imported). 
            Wrapping it here is how we combine state with a server layout. 
          */}
        <TooltipProvider delayDuration={0}>
          <SidebarProvider>

            {/* 1. The main Sidebar content (which we moved to its own file) */}
            <Sidebar />

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