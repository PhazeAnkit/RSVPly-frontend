import { Event } from "@/features/events/events.types";

export type DashboardData = {
  createdEvents: Event[];
  joinedEvents: Event[];
};
