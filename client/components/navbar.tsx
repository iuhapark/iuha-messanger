import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  BlogIcon,
  GithubIcon,
  SearchIcon,
} from "@/components/icons";
import { it } from "node:test";
import { fetchSessionUser } from "@/lib/user";
import AvatarProps from "./user/avatar";

const Navbar = async () => {
  const user = await fetchSessionUser()
  const searchInput = (
    <Input
      aria-label='Search'
      classNames={{
        inputWrapper: 'bg-default-100',
        input: 'text-sm',
      }}
      endContent={
        <Kbd className='hidden lg:inline-block' keys={['command']}>
          K
        </Kbd>
      }
      labelPlacement='outside'
      placeholder='Search...'
      startContent={
        <SearchIcon className='text-base text-default-400 pointer-events-none flex-shrink-0' />
      }
      type='search'
    />
  );

  return (
    <HeroUINavbar maxWidth='full' position='sticky'>
      <NavbarContent className='basis-1/5 sm:basis-full' justify='start'>
        <NavbarBrand as='li' className='gap-3 max-w-fit'>
          <NextLink className='flex justify-start items-center gap-1' href='/'>
            <p className='font-bold text-inherit'>iuha</p>
          </NextLink>
        </NavbarBrand>
        <ul className='hidden lg:flex gap-4 justify-start ml-2'>
        </ul>
      </NavbarContent>

      <NavbarContent
        className='hidden sm:flex basis-1/5 sm:basis-full'
        justify='end'
      >
        <NavbarItem className='hidden sm:flex gap-2'>
          <Link isExternal aria-label='Twitter' href={siteConfig.links.githubPages}>
            <BlogIcon className='text-default-500' />
          </Link>
          <Link isExternal aria-label='Github' href={siteConfig.links.github}>
            <GithubIcon className='text-default-500' />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className='hidden lg:flex'>{searchInput}</NavbarItem>
        <NavbarItem className='hidden md:flex'>
          <AvatarProps initUser={user} />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className='sm:hidden basis-1 pl-4' justify='end'>
        <Link isExternal aria-label='Github' href={siteConfig.links.github}>
          <GithubIcon className='text-default-500' />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className='mx-4 mt-2 flex flex-col gap-2'>
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 3 
                    ? 'primary'
                    : index === siteConfig.navMenuItems.length - 1
                      ? 'danger'
                      : 'foreground'
                }
                href={item.href}
                size='lg'
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};

export default Navbar;
