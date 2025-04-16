'use client';

import Header from "@/components/common/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='app-layout'>
        <Header />
        <main>{children}</main>
    </div>
  );
};

export default Layout;
