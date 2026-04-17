import { FormEvent, useState } from 'react';
import { api } from '../lib/api';

type CheckoutResponse = {
  authorizationUrl: string;
  reference: string;
};

const products = [
  { label: 'Starter plan', value: 'starter', amount: 5000 },
  { label: 'Growth plan', value: 'growth', amount: 15000 },
  { label: 'Concierge setup', value: 'concierge', amount: 50000 },
];

export default function CheckoutPage() {
  const [email, setEmail] = useState('');
  const [product, setProduct] = useState(products[0].value);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const selected = products.find((entry) => entry.value === product);

    try {
      const response = await api<CheckoutResponse>('/api/paystack/initialize', {
        method: 'POST',
        body: JSON.stringify({
          email,
          amountNgn: selected?.amount ?? 0,
          product,
          metadata: {
            source: 'web-checkout',
          },
        }),
      });

      window.location.href = response.authorizationUrl;
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'Checkout failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="card narrow stack-md">
      <div>
        <p className="eyebrow">Checkout</p>
        <h1>Collect payment with Paystack</h1>
      </div>
      <form className="stack-md" onSubmit={handleSubmit}>
        <label className="field">
          <span>Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="customer@example.com"
          />
        </label>

        <label className="field">
          <span>Offer</span>
          <select value={product} onChange={(event) => setProduct(event.target.value)}>
            {products.map((entry) => (
              <option key={entry.value} value={entry.value}>
                {entry.label} - NGN {entry.amount.toLocaleString()}
              </option>
            ))}
          </select>
        </label>

        {error ? <p className="error">{error}</p> : null}

        <button className="button" type="submit" disabled={loading}>
          {loading ? 'Redirecting...' : 'Continue to Paystack'}
        </button>
      </form>
    </section>
  );
}
