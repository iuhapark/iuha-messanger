'use client'

import { Button } from "@heroui/button"
import { Link } from "@heroui/link"
import { HeartFilledIcon } from "@/components/icons"
import { logout } from "@/lib/auth"
import { User } from "@/types/index"
import { useEffect } from "react"

export default function UserMenu({ user }: { user: User }) {
    useEffect(()=>{
        console.log('UserMenu======>', user)
    },[])
  return user ? (
    <Button
      className='text-sm font-normal text-default-600 bg-default-100'
      variant='flat'
      onPress={logout}
    >
      Logout
    </Button>
  ) : (
    <Button
      isExternal
      as={Link}
      className='text-sm font-normal text-default-600 bg-default-100'
      href='/login'
      startContent={<HeartFilledIcon className='text-danger' />}
      variant='flat'
    >
      Login
    </Button>
  )
}
