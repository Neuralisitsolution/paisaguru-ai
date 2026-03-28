export default function TrustBadges() {
  const badges = [
    { label: 'Expert Reviewed', color: 'bg-primary-100 text-primary-700', icon: '✓' },
    { label: 'Fact Checked', color: 'bg-blue-100 text-blue-700', icon: '✓' },
    { label: 'SEBI Compliant', color: 'bg-gray-100 text-gray-700', icon: '◈' },
    { label: 'SSL Secured', color: 'bg-gray-100 text-gray-700', icon: '🔒' },
    { label: 'Free Forever', color: 'bg-secondary-100 text-secondary-700', icon: '★' },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {badges.map(b => (
        <span key={b.label} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${b.color}`}>
          <span>{b.icon}</span> {b.label}
        </span>
      ))}
    </div>
  );
}
