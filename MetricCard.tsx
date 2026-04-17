export default function MetricCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <section className="card metric-card">
      <p className="metric-label">{label}</p>
      <h3>{value}</h3>
      <p className="muted">{hint}</p>
    </section>
  );
}
