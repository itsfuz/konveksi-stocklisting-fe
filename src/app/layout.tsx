// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"; // Highly recommended with shadcn/ui
import { 
  SidebarProvider, 
  SidebarInset, 
  SidebarTrigger 
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* SidebarProvider is a Client Component (imported). 
            Wrapping it here is how we combine state with a server layout. 
          */}
          <SidebarProvider>
            
            {/* 1. The main Sidebar content (which we moved to its own file) */}
            <AppSidebar />

            {/* 2. SidebarInset automatically handles the content padding/width 
                 shifts when the sidebar expands or collapses.
            */}
            <SidebarInset>
              
              {/* 3. The professional top header bar */}
              <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                <div className="flex items-center gap-2">
                  {/* The button that opens/closes the sidebar */}
                  <SidebarTrigger className="-ml-1" />
                  
                  {/* Add breadcrumbs or page title here later */}
                  <div className="text-sm text-muted-foreground">/ Dashboard</div>
                </div>
              </header>

              {/* 4. The main content area where your pages will render */}
              <main className="flex-1 p-6 lg:p-8">
                {children}
              </main>

            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}