import Account from "@/components/account/aside";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='w-full min-h-screen flex justify-center py-8 md:py-16'>
      <div className='w-full max-w-6xl grid grid-cols-1 md:grid-cols-10 gap-4 h-[800px] px-4'>
        <aside className='col-span-1 md:col-span-3 w-full h-full'>
          <Account />
        </aside>

        <main className='col-span-1 md:col-span-7 w-full h-full overflow-y-auto'>
          {children}
        </main>
      </div>
    </section>
  );
}
