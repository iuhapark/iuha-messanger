import Account from "@/components/account/aside";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='min-h-screen flex items-center justify-center py-8 md:py-16'>
      <div className='w-full max-w-3xl grid grid-cols-1 md:grid-cols-10 gap-4 h-[600px] px-4'>
        <aside className='col-span-1 md:col-span-3 w-full h-full'>
          <Account />
        </aside>
        <main className='col-span-1 md:col-span-7 w-full h-full'>
          {children}
        </main>
      </div>
    </section>
  );
}
