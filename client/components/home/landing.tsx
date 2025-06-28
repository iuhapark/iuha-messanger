'use client';

import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import { GithubIcon, RightArrowIcon } from "@/components/icons/icons";
import { subtitle, title } from "@/components/primitives";
import { siteConfig } from "@/config/site";
import { Button } from "@heroui/button";
import clsx from "clsx";

export default function Landing() {
  return (
    <section className='relative w-[full] h-[80vh] overflow-hidden flex items-center justify-center'>
      <div className='relative z-10 flex flex-col items-center justify-center gap-4 px-12 py-40 text-center'>
        <div className='inline-block max-w-xl'>
          <span className={title()}>It&apos;s not magic.&nbsp;</span>
          <br />
          <span className={title()}>It&apos;s&nbsp;</span>
          <span className={title({ color: 'violet' })}>messaging</span>
          <span className={title()}>.&nbsp;</span>
          <div className={subtitle({ class: 'mt-4' })}>
            Experience seamless conversations, zero delay.
          </div>
        </div>
        <div className='flex flex-col items-center gap-4 md:w-auto w-full md:flex-row'>
          <Button
            as={Link}
            className={clsx(
              buttonStyles({
                color: 'primary',
                radius: 'full',
                variant: 'shadow',
                size: 'lg',
              }),
              'w-full md:w-auto',
            )}
            href={siteConfig.navItems.find((i) => i.label === 'Chat')?.href}
            endContent={<RightArrowIcon size={20} />}
          >
            Start chatting
          </Button>
          <Link
            isExternal
            className={clsx(
              buttonStyles({
                variant: 'bordered',
                radius: 'full',
                size: 'lg',
              }),
              'w-full md:w-auto',
            )}
            href={siteConfig.links.github}
          >
            <GithubIcon size={20} />
            GitHub
          </Link>
        </div>
      </div>
    </section>
  );
}
