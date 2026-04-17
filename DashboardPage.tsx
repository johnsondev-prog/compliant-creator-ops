import MetricCard from '../components/MetricCard';

export default function DashboardPage() {
  return (
    <div className="stack-lg">
      <section className="row between">
        <div>
          <p className="eyebrow">Operator dashboard</p>
          <h1>Run the business from one screen.</h1>
        </div>
        <span className="badge">Serverless-first</span>
      </section>

      <section className="grid three">
        <MetricCard label="Gross volume" value="NGN 0" hint="Connect your database and analytics for live values." />
        <MetricCard label="Open orders" value="0" hint="List from /api/orders/list after persistence is wired." />
        <MetricCard label="Fulfillment SLA" value="< 10 min" hint="Target manual or semi-automated first delivery." />
      </section>

      <section className="card">
        <h2>Execution rules</h2>
        <ul className="clean-list">
          <li>Keep the offer count small.</li>
          <li>Never deliver value before payment verification.</li>
          <li>Use admin approval for new or high-risk orders.</li>
          <li>Only automate workflows that repeat.</li>
        </ul>
      </section>
    </div>
  );
}
