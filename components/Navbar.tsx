"use client"

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const handleLinkClick = () => setOpen(false)

  return (
    <header className="w-full bg-white dark:bg-gray-900 border-b px-6 py-3 flex justify-between items-center">
      {/* Logo or Title */}
      <Link href="/" className="text-xl font-bold text-primary">
        Admin Dashboard
      </Link>

      {/* Desktop Navigation */}
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList className="flex gap-4">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/dashboard" className="text-sm hover:text-primary">
                Dashboard
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/products" className="text-sm hover:text-primary">
                Products
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/settings" className="text-sm hover:text-primary">
                Settings
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Mobile Hamburger Menu */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 bg-white dark:bg-gray-900">
            <nav className="flex flex-col gap-4 mt-6">
              <Link href="/dashboard" onClick={handleLinkClick} className="text-sm hover:text-primary">
                Dashboard
              </Link>
              <Link href="/products" onClick={handleLinkClick} className="text-sm hover:text-primary">
                Products
              </Link>
              <Link href="/settings" onClick={handleLinkClick} className="text-sm hover:text-primary">
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
