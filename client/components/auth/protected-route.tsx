'use client'

import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "../loading/circular";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      alert('로그인이 필요한 서비스입니다.')
      router.replace('/sign-in')
    }
  }, [loading, user, router])

if (loading || !user) return <Loading />

  return <>{children}</>
}