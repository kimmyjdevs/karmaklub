'use client';

import { useState } from 'react';

export default function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const url = typeof window !== 'undefined' ? window.location.href : '';
  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-xs uppercase tracking-widest text-text-secondary">Share:</span>
      <button
        onClick={copyLink}
        className="btn-outline text-xs"
        aria-label="Copy link"
      >
        {copied ? 'Copied!' : 'Copy Link'}
      </button>
      <a
        href={fbUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-outline text-xs"
        aria-label="Share on Facebook"
      >
        Facebook
      </a>
    </div>
  );
}
