"use client";

import { useAuthStore } from "@/store/auth.store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, hydrated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && isAuthenticated) {
      router.replace("/events");
    }
  }, [hydrated, isAuthenticated, router]);

  if (!hydrated) return null;

  return (
    <div className="min-h-screen flex items-center justify-center">
      {children}
    </div>
  );
}
