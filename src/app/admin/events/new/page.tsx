import EventForm from '../EventForm';

export default function NewEventPage() {
  return (
    <div className="p-8 max-w-3xl">
      <h1 className="font-display font-bold text-3xl uppercase tracking-widest text-white mb-8">
        New Event
      </h1>
      <EventForm />
    </div>
  );
}
