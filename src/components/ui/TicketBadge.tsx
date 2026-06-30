const config: Record<string, { label: string; className: string }> = {
  FREE: { label: 'Free Entry', className: 'text-white border-white' },
  AVAILABLE: { label: 'Tickets Available', className: 'text-text-secondary border-border' },
  SOLD_OUT: { label: 'Sold Out', className: 'text-destructive border-destructive' },
};

export default function TicketBadge({ status }: { status: string }) {
  const { label, className } = config[status] ?? config.AVAILABLE;
  return (
    <span className={`font-mono text-[10px] uppercase tracking-widest border px-2 py-0.5 ${className}`}>
      {label}
    </span>
  );
}
