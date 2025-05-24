export type SiteConfig = typeof siteConfig;

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
      label: 'Login',
      href: '/login',
    },
    {
      label: 'Join',
      href: '/join',
    },
  ],
  navMenuItems: [
    {
      label: 'Profile',
      href: '/profile',
    },
    {
      label: 'Settings',
      href: '/settings',
    },
    {
      label: 'Login',
      href: '/login',
    },
    {
      label: 'Logout',
      href: '/logout',
    },
  ],
  links: {
    githubPages: 'https://iuhapark.github.io',
    github: 'https://github.com/iuhapark',
    docs: 'https://docs.google.com/presentation/d/1Nyw-CviIb-cDY1qQ5Cxgh4Fsegyy2neI31IluuQ1fLA',
    sponsor: 'https://patreon.com/jrgarciadev',
  },
};
