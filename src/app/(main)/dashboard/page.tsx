"use client";

import { useDashboard } from "@/features/dashboard/dashboard.hooks";
import { getDashboardCounts } from "@/lib/dashboard.utils";
import StatCard from "@/components/dashboard/StatCard";
import EventCard from "@/components/events/EventCard";

export default function DashboardPage() {
  const { data, isLoading, isError } = useDashboard();

  if (isLoading) return <p>Loading dashboard...</p>;
  if (isError || !data) return <p>Failed to load dashboard</p>;

  const counts = getDashboardCounts(data.createdEvents, data.joinedEvents);

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Created Events" value={counts.created} />
        <StatCard title="Joined Events" value={counts.joined} />
        <StatCard title="Upcoming Events" value={counts.upcoming} />
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-4">My Events</h2>
        {data.createdEvents.length === 0 ? (
          <p className="text-muted-foreground">No events created</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.createdEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                isCreator
                isJoined={false}
              />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Joined Events</h2>
        {data.joinedEvents.length === 0 ? (
          <p className="text-muted-foreground">No joined events</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.joinedEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                isCreator={false}
                isJoined
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
