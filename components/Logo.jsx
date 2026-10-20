// Turnstone mark: a path that turns back on itself around a stone, then the
// wordmark. Drawn in currentColor; the accent dot uses the brand tint.
export default function Logo({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 230 56" aria-hidden="true">
      <path d="M8 44C8 22 22 10 34 10s22 10 22 20-8 16-16 16-12-6-12-12" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
      <circle cx="34" cy="30" r="5" fill="var(--brand-500)" />
      <text x="68" y="32" fill="currentColor" className="logo-word">
        Turnstone
      </text>
      <text x="69" y="49" fill="currentColor" className="logo-sub">
        FINANCIAL PLANNING
      </text>
    </svg>
  );
}
