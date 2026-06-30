const labels: Record<string, string> = {
  OPEN_DECKS: 'Open Decks',
  POPUP: 'Pop-Up',
  HEADLINE: 'Headline',
};

export default function EventTypeTag({ type }: { type: string }) {
  return (
    <span className="font-mono text-[10px] uppercase tracking-widest text-text-secondary border border-border px-2 py-0.5">
      {labels[type] ?? type}
    </span>
  );
}
