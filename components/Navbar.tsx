"use client"

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import Cookies from 'js-cookie'
import { useRouter } from "next/navigation"
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const router = useRouter();

  const handleLinkClick = () => setOpen(false)

  const handleLogout = () => {
    Cookies.remove('token')
    router.replace('/login');
  }

  const pathname = usePathname()
  const hideNavbar = pathname === '/login';

  if (hideNavbar) return null;

  return (
    <header className="w-full bg-white dark:bg-gray-900 border-b px-6 py-3 flex justify-between items-center">
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
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Button onClick={handleLogout}>
                Logout
              </Button>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Mobile Hamburger Menu */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 bg-white dark:bg-gray-900">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-6 px-5">
              <Link href="/dashboard" onClick={handleLinkClick} className="text-sm hover:text-primary">
                Dashboard
              </Link>
              <Link href="/products" onClick={handleLinkClick} className="text-sm hover:text-primary">
                Products
              </Link>
              <Link href="/settings" onClick={handleLinkClick} className="text-sm hover:text-primary">
                Settings
              </Link>
              <Button
                onClick={() => {
                  handleLinkClick()
                  handleLogout()
                }}
                variant="outline"
                className="mt-4 w-full"
              >
                Logout
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
