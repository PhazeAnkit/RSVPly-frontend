import { Event } from "@/features/events/events.types";

export function getDashboardCounts(
  createdEvents: Event[],
  joinedEvents: Event[]
) {
  const now = new Date();

  const upcomingEvents = [...createdEvents, ...joinedEvents].filter(
    (event) =>
      new Date(event.eventTime) > now &&
      new Date(event.bookingClose) > now
  );

  return {
    created: createdEvents.length,
    joined: joinedEvents.length,
    upcoming: upcomingEvents.length,
  };
}
