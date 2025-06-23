'use client'

import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "../loading/circular";
import { addToast } from "@heroui/react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      addToast({
        title: 'Sign in Required',
        description: 'Redirecting to the sign in page.',
        icon: 'warning',
      })
      router.replace('/sign-in')
    }
  }, [loading, user, router])

if (loading || !user) return <Loading />

  return <>{children}</>
}