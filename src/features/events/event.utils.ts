import dayjs from "dayjs";
import { Event, EventStatus } from "./events.types";

export function getEventStatus({
  event,
  isCreator,
  isJoined,
}: {
  event: Event;
  isCreator: boolean;
  isJoined: boolean;
}): EventStatus {
  if (isCreator) return "CREATED";
  if (isJoined) return "JOINED";
  if (dayjs(event.bookingClose).isBefore(dayjs())) return "CLOSED";
  if (event.bookedCount >= event.eventCapacity) return "FULL";
  return "OPEN";
}
