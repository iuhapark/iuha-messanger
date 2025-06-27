'use client'

import { Button } from "@heroui/button"
import { Link } from "@heroui/link"
import { logout } from "@/lib/auth"
import { User } from "@/types/index"
import { useEffect } from "react"
import { useAuth } from "@/context/authContext"
import { siteConfig } from "@/config/site";

export default function AuthButton({ initUser }: { initUser: User | null }) {
  const { user, setUser } = useAuth()

  useEffect(() => {
    if (initUser) setUser(initUser)
  }, [initUser, setUser])

  const loginButton = (
    <Button
      as={Link}
      size='sm'
      radius='full'
      href={siteConfig.navItems.find(item => item.label === 'Sign in')?.href}
      variant='flat'
      className='md:w-auto w-18 md:h-9 text-xs'
    >
      Sign in
    </Button>
  )

  const logoutButton = (
    <Button
      // size='sm'
      radius='full'
      onPress={logout}
      className='md:w-auto w-18 md:h-9 text-xs'
    >
      Sign out
    </Button>
  )

  return user ? logoutButton : loginButton
}
