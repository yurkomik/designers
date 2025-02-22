"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Small delay to ensure cookies are processed
    setTimeout(() => {
      // Redirect to home page which will now require re-authentication
      router.push("/");
    }, 100);
  }, [router]);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <p className="text-muted-foreground">Logging out...</p>
    </div>
  );
} 