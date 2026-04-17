import { useEffect, useState } from 'react';
import { api } from '../lib/api';

type Order = {
  id: string;
  email: string;
  product: string;
  amountNgn: number;
  status: string;
  createdAt: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api<{ orders: Order[] }>('/api/orders/list')
      .then((data) => setOrders(data.orders))
      .catch((loadError) => setError(loadError instanceof Error ? loadError.message : 'Failed to load orders'));
  }, []);

  return (
    <section className="stack-md">
      <div>
        <p className="eyebrow">Orders</p>
        <h1>Current orders</h1>
      </div>
      {error ? <p className="error">{error}</p> : null}
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Product</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {orders.length ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.email}</td>
                  <td>{order.product}</td>
                  <td>{order.status}</td>
                  <td>NGN {order.amountNgn.toLocaleString()}</td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="muted">
                  No orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
