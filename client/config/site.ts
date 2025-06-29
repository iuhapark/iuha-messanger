export type SiteConfig = typeof siteConfig;

type NavMenuItem = {
  label: string;
  href?: string;
  onClick?: () => void;
};

export const siteConfig = {
  name: 'iuha',
  description: 'Connect in Real-time. Chat with anyone, anytime — right away.',
  navItems: [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Docs',
      href: '/docs',
    },
    {
      label: 'Chat',
      href: '/chat',
    },
    {
      label: 'Sign in',
      href: '/sign-in',
    },
    {
      label: 'Sign up',
      href: '/sign-up',
    },
  ],
  navMenuItems: [
    {
      label: 'Account',
      href: '/account/information',
    },
    {
      label: 'Friends',
      href: '/friends',
    },
    {
      label: 'Settings',
      href: '/settings',
    },
    {
      label: 'Sign in',
      href: '/sign-in',
    },
    {
      label: 'Sign out',
      href: '/sign-out',
    },
  ] as NavMenuItem[],
  navAccountItems: [
    {
      label: 'Information',
      href: '/account/information',
    },
    {
      label: 'Security',
      href: '/account/security',
    },
    {
      label: 'Folloing',
      href: '/account/following',
    },
  ] as NavMenuItem[],
  links: {
    githubPages: 'https://iuhapark.github.io',
    github: 'https://github.com/iuhapark/iuha-messenger',
    docs: 'https://docs.google.com/presentation/d/1Nyw-CviIb-cDY1qQ5Cxgh4Fsegyy2neI31IluuQ1fLA',
    google: `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/google`
  },
};
