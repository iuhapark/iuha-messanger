'use server'

import { cookies } from "next/headers"
import { User } from "@/types/index"

export const fetchSessionUser = async (): Promise<User | null> => {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('connect.sid')?.value
    if (!sessionCookie) return null

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
      headers: {
        Cookie: `connect.sid=${sessionCookie}`,
      },
      credentials: 'include',
      cache: 'no-store',
    })

    const contentType = res.headers.get('content-type') || ''
    if (!res.ok || !contentType.includes('application/json')) return null

    const user = await res.json()
    return user?.id ? user : null
  } catch (err) {
    console.warn('fetchSessionUser error:', err)
    return null
  }
}
