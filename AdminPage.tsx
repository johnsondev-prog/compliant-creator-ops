export default function AdminPage() {
  return (
    <section className="stack-md">
      <div>
        <p className="eyebrow">Admin</p>
        <h1>Manual operations first</h1>
      </div>
      <div className="grid two">
        <article className="card">
          <h3>Review queue</h3>
          <p>Approve new users, handle exceptions, and keep automation behind a human checkpoint until volume justifies it.</p>
        </article>
        <article className="card">
          <h3>Provider adapters</h3>
          <p>Wire only approved vendors. Keep credentials in Vercel environment variables and never expose secrets to the frontend.</p>
        </article>
      </div>
    </section>
  );
}
