export default function FriendsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='flex items-center justify-center py-8 md:py-10'>
      <div className='inline-block text-center justify-center'>
        {children}
      </div>
    </section>
  );
}
