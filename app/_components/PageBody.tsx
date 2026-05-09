export default function PageBody({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="page-body">
      <div className="container">
        <div className="grid">
          <div className="label reveal">{label}</div>
          <div className="reveal">{children}</div>
        </div>
      </div>
    </section>
  );
}
