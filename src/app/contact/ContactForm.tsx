'use client';

import { useState } from 'react';

const SUBJECTS = [
  'General Enquiry',
  'DJ Booking / Submission',
  'Event Collaboration',
  'Merch / Order Issue',
  'Press',
];

type State = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [state, setState] = useState<State>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState('loading');
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      setState('success');
      form.reset();
    } catch (err) {
      setState('error');
      setErrorMsg('Something went wrong. Please try again or email us directly.');
    }
  };

  if (state === 'success') {
    return (
      <div className="border border-border py-10 text-center">
        <p className="font-display font-bold text-xl uppercase text-white mb-2">Message Sent</p>
        <p className="text-text-secondary text-sm">
          We&apos;ll get back to you shortly. Thanks for reaching out.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <Field label="Name" name="name" type="text" required placeholder="Your name" />
      <Field label="Email" name="email" type="email" required placeholder="your@email.com" />

      <div className="flex flex-col gap-1.5">
        <label className="font-mono text-xs uppercase tracking-widest text-text-secondary">
          Subject
        </label>
        <select
          name="subject"
          required
          className="bg-card border border-border text-text-primary font-mono text-sm px-4 py-3 focus:outline-none focus:border-white transition-colors appearance-none"
        >
          <option value="" disabled selected>Select a subject</option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-mono text-xs uppercase tracking-widest text-text-secondary">
          Message
        </label>
        <textarea
          name="message"
          required
          rows={6}
          placeholder="Your message..."
          className="bg-card border border-border text-text-primary font-mono text-sm px-4 py-3 focus:outline-none focus:border-white transition-colors resize-none"
        />
      </div>

      {state === 'error' && (
        <p className="font-mono text-xs text-destructive">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={state === 'loading'}
        className="btn-primary disabled:opacity-50"
      >
        {state === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="font-mono text-xs uppercase tracking-widest text-text-secondary">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="bg-card border border-border text-text-primary font-mono text-sm px-4 py-3 focus:outline-none focus:border-white transition-colors placeholder:text-border"
      />
    </div>
  );
}
