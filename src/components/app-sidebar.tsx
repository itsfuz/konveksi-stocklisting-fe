"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Dashboard", href: "/" },
  { name: "Master Motif", href: "/master-motif" },
  { name: "Master Tukang Potong / CMT", href: "/master-cmt" },
  { name: "Master Artikel", href: "/master-artikel" },
  { name: "PO", href: "/po" },
  { name: "Setoran", href: "/setoran" },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <nav className="w-64 bg-gray-100 border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">Stock Listing Dashboard</h1>
      </div>
      <div className="flex-1 p-4">
        <div className="space-y-2">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <Button
                variant={pathname === item.href ? "default" : "ghost"}
                className={`w-full justify-start px-4 py-3 text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "bg-gray-800 text-white hover:bg-gray-700"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-200"
                }`}
              >
                {item.name}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
