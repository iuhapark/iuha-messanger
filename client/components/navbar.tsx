import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import NextLink from "next/link";

import {
  BlogIcon,
  GithubIcon
} from "@/components/icons/icons";
import { ThemeSwitch } from "@/components/theme-switch";
import githubInfo from "@/config/github-info.json";
import { siteConfig } from "@/config/site";
import { fetchSessionUser } from "@/lib/user";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/react";
import { SearchLinearIcon } from "./icons/linear/search";
import DropdownAvatar from "./avatar/dropdown";

const Navbar = async () => {
  const user = await fetchSessionUser();

  const searchInput = (
    <Button
      aria-label='Quick search'
      className='border-1 px-3 border-default-200 rounded-full text-small font-normal text-default-500 bg-transparent'
      endContent={
        <Kbd className='hidden text-xs rounded-full py-0.5 px-1.5 lg:inline-block' keys={['command']}>
          K
        </Kbd>
      }
      startContent={
        <SearchLinearIcon
          className='text-base text-default-400 pointer-events-none flex-shrink-0'
          size={16}
          strokeWidth={2}
        />
      }
      variant='bordered'
    >
      Search
    </Button>
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
        <NavbarItem>
          <Link
            isExternal
            color='foreground'
            href={siteConfig.navItems.find(i => i.label === 'Chat')?.href}
          >
            Chat
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            isExternal
            color='foreground'
            href={siteConfig.links.githubPages}
          >
            Blog
          </Link>
        </NavbarItem>
        <Divider className='h-7 hidden lg:flex' orientation='vertical' />
        <NavbarItem className='hidden lg:flex'>{searchInput}</NavbarItem>
        <Link
          isExternal
          aria-label='Github'
          className='flex gap-0.5 items-center h-10 px-2 border-1 border-default-200 rounded-full text-default-600 dark:text-default-500'
          href={siteConfig.links.github}
        >
          <GithubIcon className='text-default-500' />
          <span className="text-xs font-medium">{githubInfo.stars.formatted}</span>
        </Link>
        <ThemeSwitch
          className='flex gap-0.5 items-center h-10 px-2 border-1 border-default-200 rounded-full text-default-600 dark:text-default-500'
        />
        <NavbarItem className='hidden md:flex'>
          <DropdownAvatar initUser={user} />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className='sm:hidden basis-1 pl-4' justify='end'>
        <Link isExternal aria-label='Blog' href={siteConfig.links.githubPages}>
            <BlogIcon className='text-default-500' />
        </Link>
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
