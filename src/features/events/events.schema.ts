import { z } from "zod";

export const createEventSchema = z.object({
  description: z.string().min(3, "Description is required"),
  eventTime: z.string(),
  bookingClose: z.string(),
  eventCapacity: z.number().min(1, "Capacity must be at least 1"),
  location: z.string().optional(),
  meetingLink: z.string().optional(),
});

export type CreateEventInput = z.infer<typeof createEventSchema>;
