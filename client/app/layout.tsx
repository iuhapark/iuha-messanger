import "@/styles/index.css";
import clsx from "clsx";
import { Metadata, Viewport } from "next";

import Navbar from "@/components/navbar";
import { fontSans } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import { AuthProvider } from "@/context/authContext";
import { LoadingProvider } from "@/context/loadingContext";
import { fetchSessionUser } from "@/lib/user";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await fetchSessionUser();
  return (
    <html suppressHydrationWarning lang='en'>
      <head />
      <body
        className={clsx(
          'min-h-screen text-foreground bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          <LoadingProvider>
          <AuthProvider initUser={user}>
          <div className='relative flex flex-col h-screen'>
            <Navbar />
            <main className='container mx-auto max-w-full flex-grow'>
              {children}
            </main>
            {/* <footer className='flex w-full items-center justify-center py-3'>
              <Link
                isExternal
                className='flex items-center gap-1 text-current'
                href='mailto: juhabahk@gmail.com'
                title='gmail.com email'
              >
                <span className='text-default-600 text-xs'>Developed by</span>
                <p className='text-primary text-xs'>Juha Park</p>
              </Link>
            </footer> */}
          </div>
          </AuthProvider>
          </LoadingProvider>
        </Providers>
      </body>
    </html>
  );
}
