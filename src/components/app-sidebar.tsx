"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogOut, User, LayoutDashboard, FileText, UserSquare2, Layers3, BookUser, Banknote } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { logout } from "@/lib/actions/auth"

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Master Motif", href: "/master-motif", icon: FileText },
  { name: "Master Tukang Potong / CMT", href: "/master-cmt", icon: UserSquare2 },
  { name: "Master Artikel", href: "/master-artikel", icon: Layers3 },
  { name: "PO", href: "/po", icon: BookUser },
  { name: "Setoran", href: "/setoran", icon: Banknote },
]

export function AppSidebar({ username }: { username?: string }) {
  const pathname = usePathname()

  return (
    <Sidebar className="bg-muted/50 border-r">
      {/* Header matching your image design */}
      <SidebarHeader className="h-16 flex items-center px-6 border-b">
        <div className="flex flex-col gap-1">
          <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            KONVEKSI SYSTEM
          </div>
          <div className="text-lg font-semibold text-foreground tracking-tight">
            Stock Listing Dashboard
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarMenu className="gap-1">
          {navItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                className="h-10 px-4 data-[active=true]:bg-gray-800 data-[active=true]:text-white"
              >
                <Link href={item.href} className="flex items-center gap-3">
                  <item.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      {/* Profile Section pinned to the bottom */}
      <SidebarFooter className="p-4 border-t bg-background/50">
        <div className="flex items-center gap-3 px-2 py-1.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <User className="h-5 w-5" />
          </div>
          
          <div className="flex flex-1 flex-col text-left text-sm leading-tight">
            <span className="truncate font-semibold text-foreground">
              {username || "Guest"}
            </span>
          </div>

          <form action={logout}>
            <button 
              type="submit"
              className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </form>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}