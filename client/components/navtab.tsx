import { siteConfig } from '@/config/site';
import { usePathname } from 'next/navigation';
import { Link } from '@heroui/link';
import clsx from 'clsx';

const AccountNavTabs = () => {
  const pathname = usePathname();

  const filtered = siteConfig.navMenuItems.filter(
    (item): item is { label: string; href: string } =>
      !!item.href && [/* '/account', '/friends',  */'/settings'].includes(item.href)
  );

  return (
    <nav className='flex gap-4 border-b px-4 pb-2'>
      {filtered.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={clsx(
            'text-sm font-medium',
            pathname === item.href ? 'text-primary border-b-2 border-primary' : 'text-default-500'
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default AccountNavTabs;