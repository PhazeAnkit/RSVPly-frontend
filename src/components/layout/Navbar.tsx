"use client";

import Link from "next/link";
import { Moon, Sun, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/store/theme.store";
import { useAuthStore } from "@/store/auth.store";

export default function Navbar() {
  const { theme, toggleTheme } = useThemeStore();
  const logout = useAuthStore((state) => state.logout);

  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/events" className="text-xl font-semibold">
          RSVPly
        </Link>

        <nav className="hidden md:flex gap-6">
          <Link href="/events" className="text-sm font-medium hover:underline">
            Events
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-medium hover:underline"
          >
            Dashboard
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={logout}
            aria-label="Logout"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
