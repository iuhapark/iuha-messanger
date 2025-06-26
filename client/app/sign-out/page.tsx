'use client';
import Loading from "@/components/loading/circular";
import { logout } from "@/lib/auth";
import { useEffect } from "react";

export default function LogoutPage() {
  
  useEffect(() => {
    logout();
  }, []);

  return <Loading />;
}
