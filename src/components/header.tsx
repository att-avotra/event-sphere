"use client";
import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 w-full z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-primary font-extrabold text-2xl">
            Event Sphere
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 ml-10">
          <Link
            href="/"
            className={`text-sm font-medium ${pathname === "/" ? "text-primary font-bold border-b-2 border-primary" : "hover:text-primary"} transition-colors`}
            // className="text-sm font-medium hover:text-primary transition-colors"
          >
            Explorer
          </Link>
          <Link
            href="/calendar"
            className={`text-sm font-medium ${pathname === "/calendar" ? "text-primary font-bold border-b-2 border-primary" : "hover:text-primary"} transition-colors`}
          >
            Calendrier
          </Link>
          <Link
            href="/price"
            className={`text-sm font-medium ${pathname === "/price" ? "text-primary font-bold border-b-2 border-primary" : "hover:text-primary"} transition-colors`}
          >
            Prix
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium ${pathname === "/about" ? "text-primary font-bold border-b-2 border-primary" : "hover:text-primary"} transition-colors`}
          >
            À propos
          </Link>
        </nav>

        <div className="flex items-center gap-3 ml-auto">
          <Button variant="ghost" asChild>
            <Link href="/">Se connecter</Link>
          </Button>
          <Button asChild>
            <Link href="/">Créer un événement</Link>
          </Button>
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
              className="grayscale"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          {/* Menu Mobile */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 mt-10">
                <Link href="/blog" className="text-lg font-medium">
                  Blog
                </Link>
                <Link href="/docs" className="text-lg font-medium">
                  Documentation
                </Link>
                <Link href="/about" className="text-lg font-medium">
                  À propos
                </Link>

                <div className="flex flex-col gap-3 mt-6">
                  <Button variant="outline" asChild>
                    <Link href="/login">Se connecter</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/register">Commencer</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
