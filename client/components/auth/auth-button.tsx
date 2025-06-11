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
      className='text-sm font-normal text-default-600 bg-default-100'
      href={siteConfig.navItems.find(item => item.label === 'Sign in')?.href}
      variant='flat'
    >
      Sign in
    </Button>
  )

  const logoutButton = (
    <Button
      onPress={logout}
    >
      Sign out
    </Button>
  )

  return user ? logoutButton : loginButton
}
