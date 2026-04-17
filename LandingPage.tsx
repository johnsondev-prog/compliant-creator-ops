import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="stack-lg">
      <section className="hero card">
        <span className="eyebrow">Minimal. Fast. Revenue-first.</span>
        <h1>Launch a direct-to-consumer operations platform without building a heavy back office.</h1>
        <p className="lead">
          This starter ships a clean frontend, secure serverless payment endpoints, an admin shell, and room to plug in approved service providers later.
        </p>
        <div className="row gap-sm">
          <Link className="button" to="/checkout">
            Start checkout flow
          </Link>
          <Link className="button button-secondary" to="/dashboard">
            View dashboard
          </Link>
        </div>
      </section>

      <section className="grid three">
        <article className="card">
          <h3>Authentication</h3>
          <p>Clerk-ready routing and session shell.</p>
        </article>
        <article className="card">
          <h3>Payments</h3>
          <p>Paystack initialize, verify, and webhook handlers.</p>
        </article>
        <article className="card">
          <h3>Notifications</h3>
          <p>Transactional email endpoint powered by Resend.</p>
        </article>
      </section>
    </div>
  );
}
