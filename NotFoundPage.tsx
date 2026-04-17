import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="card narrow stack-md">
      <h1>Page not found</h1>
      <p className="muted">The route does not exist in this starter.</p>
      <Link className="button" to="/">
        Go home
      </Link>
    </section>
  );
}
