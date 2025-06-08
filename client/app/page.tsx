import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";

import { ArrowIcon, GithubIcon } from "@/components/icons";
import { subtitle, title } from "@/components/primitives";
import { siteConfig } from "@/config/site";
import { Button } from "@heroui/button";
import Image from "next/image";

export default function Home() {
  return (
    <section className='relative w-[full] h-[700px] overflow-hidden flex items-center justify-center'>
    {/* <Image
      src='/assets/img/main.png'
      alt='main'
      fill
      className='object-none md:object-contain '
      priority
    /> */}
    <div className='relative z-10 flex flex-col items-center justify-center gap-4 px-52 py-40 text-center'>
      <div className='inline-block max-w-xl'>
        <span className={title()}>It's not magic.&nbsp;</span>
        <br />
        <span className={title()}>It's&nbsp;</span>
        <span className={title({ color: 'violet' })}>messaging</span>
        <span className={title()}>.&nbsp;</span>
        <div className={subtitle({ class: 'mt-4' })}>
          Experience seamless conversations, zero delay.
          <br />
        </div>
    </div>

    <div className='flex gap-3 mt-6'>
      <Button
        as={Link}
        className={buttonStyles({
          color: 'primary',
          radius: 'full',
          variant: 'shadow',
        })}
        href={siteConfig.navItems.find(i => i.label === 'Chat')?.href}
        endContent={<ArrowIcon size={20}
      />}
      >Chat</Button>
      <Link
        className={buttonStyles({ variant: 'bordered', radius: 'full' })}
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