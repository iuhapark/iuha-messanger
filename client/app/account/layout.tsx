import Account from "@/components/account/aside";
import ProtectedRoute from "@/components/auth/protected-route";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
    <section className='min-h-screen flex justify-center py-8 md:py-16'>
      <div className='w-full max-w-3xl grid grid-cols-1 items-start content-start md:grid-cols-10 gap-4 h-[600px]'>
        <aside className='col-span-1 md:col-span-3 w-full h-full'>
          <Account />
        </aside>
        <main className='col-span-1 md:col-span-7 w-full'>
          {children}
        </main>
      </div>
    </section>
    </ProtectedRoute>
  );
}
