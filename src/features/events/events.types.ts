export type Event = {
  _id: string;
  description: string;
  eventCapacity: number;
  bookedCount: number;
  eventTime: string;
  bookingClose: string;
  location?: string;
  meetingLink?: string;
  createdAt: string;
};

export type EventStatus = "OPEN" | "FULL" | "CLOSED" | "JOINED" | "CREATED";

export type CreateEventPayload = {
  description: string;
  eventTime: string;
  bookingClose: string;
  eventCapacity: number;
  location?: string;
  meetingLink?: string;
};
