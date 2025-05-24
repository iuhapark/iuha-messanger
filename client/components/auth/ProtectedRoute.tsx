'use client'

import Loading from "@/app/loading";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      alert('로그인이 필요한 서비스입니다.')
      router.replace('/login')
    }
  }, [loading, user, router])

if (loading || !user) return <Loading />

  return <>{children}</>
}