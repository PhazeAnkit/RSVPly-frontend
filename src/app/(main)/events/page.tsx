"use client";

import { useEvents } from "@/features/events/events.hook";
import EventCard from "@/components/events/EventCard";
import { Event } from "@/features/events/events.types"

export default function EventsPage() {
  const { data, isLoading, isError } = useEvents();

  if (isLoading) return <p>Loading events...</p>;
  if (isError) return <p>Failed to load events</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">All Events</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.map((event: Event) => (
          <EventCard
            key={event._id}
            event={event}
            isCreator={false} 
            isJoined={false} 
          />
        ))}
      </div>
    </div>
  );
}
