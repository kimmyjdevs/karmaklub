'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { slugify } from '@/lib/utils';
import type { Event } from '@/db/schema';

type Props = { event?: Event };

const EVENT_TYPES = ['OPEN_DECKS', 'POPUP', 'HEADLINE'];
const TICKET_STATUSES = ['FREE', 'AVAILABLE', 'SOLD_OUT'];

export default function EventForm({ event }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [lineup, setLineup] = useState<string[]>(
    (event?.lineup as string[]) ?? ['']
  );

  const [slug, setSlug] = useState(event?.slug ?? '');
  const [autoSlug, setAutoSlug] = useState(!event);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (autoSlug) setSlug(slugify(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const data = {
      title: fd.get('title') as string,
      slug,
      date: fd.get('date') as string,
      venue: fd.get('venue') as string,
      suburb: fd.get('suburb') as string,
      eventType: fd.get('eventType') as string,
      shortDescription: fd.get('shortDescription') as string,
      longDescription: fd.get('longDescription') as string,
      lineup: lineup.filter(Boolean),
      yourKindUrl: fd.get('yourKindUrl') as string,
      ticketStatus: fd.get('ticketStatus') as string,
      coverImage: fd.get('coverImage') as string,
      published: fd.get('published') === 'on',
    };

    const method = event ? 'PUT' : 'POST';
    const url = event
      ? `/api/admin/events/${event.id}`
      : '/api/admin/events';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    setLoading(false);
    if (res.ok) router.push('/admin/events');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <FormField label="Title" name="title" required defaultValue={event?.title} onChange={handleTitleChange} />

      <div className="flex flex-col gap-1.5">
        <label className="label">Slug</label>
        <div className="flex gap-2">
          <input
            value={slug}
            onChange={(e) => { setSlug(e.target.value); setAutoSlug(false); }}
            className="input flex-1"
            placeholder="auto-generated-from-title"
          />
          <button
            type="button"
            onClick={() => setAutoSlug(true)}
            className="btn-outline text-xs px-3"
          >
            Auto
          </button>
        </div>
      </div>

      <FormField label="Date & Time" name="date" type="datetime-local" required
        defaultValue={event?.date ? new Date(event.date).toISOString().slice(0, 16) : undefined} />

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Venue" name="venue" required defaultValue={event?.venue} />
        <FormField label="Suburb" name="suburb" required defaultValue={event?.suburb} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <SelectField label="Event Type" name="eventType" options={EVENT_TYPES} defaultValue={event?.eventType} />
        <SelectField label="Ticket Status" name="ticketStatus" options={TICKET_STATUSES} defaultValue={event?.ticketStatus ?? 'AVAILABLE'} />
      </div>

      <FormField label="Short Description" name="shortDescription" defaultValue={event?.shortDescription ?? ''} />
      <TextareaField label="Long Description" name="longDescription" rows={6} defaultValue={event?.longDescription ?? ''} />

      {/* Lineup */}
      <div className="flex flex-col gap-2">
        <label className="label">Lineup</label>
        {lineup.map((dj, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={dj}
              onChange={(e) => {
                const next = [...lineup];
                next[i] = e.target.value;
                setLineup(next);
              }}
              className="input flex-1"
              placeholder={`DJ ${i + 1}`}
            />
            <button
              type="button"
              onClick={() => setLineup(lineup.filter((_, j) => j !== i))}
              className="btn-outline text-xs px-3"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setLineup([...lineup, ''])}
          className="btn-outline text-xs self-start"
        >
          + Add DJ
        </button>
      </div>

      <FormField label="YourKind Embed URL" name="yourKindUrl" type="url"
        placeholder="https://yourkind.com.au/..."
        defaultValue={event?.yourKindUrl ?? ''} />

      <FormField label="Cover Image URL (Cloudinary)" name="coverImage"
        defaultValue={event?.coverImage ?? ''} />

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          name="published"
          type="checkbox"
          defaultChecked={event?.published ?? false}
          className="w-4 h-4 accent-white"
        />
        <span className="font-mono text-sm text-text-secondary uppercase tracking-widest">Published</span>
      </label>

      <button type="submit" disabled={loading} className="btn-primary disabled:opacity-50">
        {loading ? 'Saving...' : event ? 'Update Event' : 'Create Event'}
      </button>
    </form>
  );
}

function FormField({
  label,
  name,
  type = 'text',
  required,
  defaultValue,
  placeholder,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="label">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onChange}
        className="input"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  defaultValue,
}: {
  label: string;
  name: string;
  options: string[];
  defaultValue?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="label">{label}</label>
      <select id={name} name={name} defaultValue={defaultValue} className="input appearance-none">
        {options.map((o) => (
          <option key={o} value={o}>{o.replace(/_/g, ' ')}</option>
        ))}
      </select>
    </div>
  );
}

function TextareaField({
  label,
  name,
  rows,
  defaultValue,
}: {
  label: string;
  name: string;
  rows?: number;
  defaultValue?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="label">{label}</label>
      <textarea id={name} name={name} rows={rows ?? 4} defaultValue={defaultValue} className="input resize-none" />
    </div>
  );
}
