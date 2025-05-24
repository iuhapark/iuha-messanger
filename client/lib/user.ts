'use server';

import { User } from "@/types/index";
import { cookies } from 'next/headers';

/* 세션에서 유저 정보 추출 */
export const fetchSessionUser = async (): Promise<User | null> => {
  try {
    const cookie = cookies().toString()

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
      headers: {
        Cookie: cookie,
      },
      credentials: 'include',
      cache: 'no-store',
    })

    const contentType = res.headers.get('content-type') || ''
    if (!res.ok || !contentType.includes('application/json')) return null

    const user = await res.json()
    return user && user.id ? user : null
  } catch (err) {
    console.warn('fetchSessionUser error:', err)
    return null
  }
}