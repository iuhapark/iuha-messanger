'use client';
import '@/styles/_index.scss';
import Header from "@/components/common/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='app-layout'>
        <Header />
        <div className='app-content'>{children}</div>
    </div>
  );
};

export default Layout;
