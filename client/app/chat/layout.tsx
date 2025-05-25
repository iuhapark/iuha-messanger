export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div>
        {children}
      </div>
    </section>
  );
}
