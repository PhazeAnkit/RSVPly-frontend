import { api } from "@/services/api";
import { CreateEventPayload } from "./events.types";

export const eventsApi = {
  getAll: () => api.get("/event"),

  getById: (id: string) => api.get(`/event/${id}`),

  join: (id: string) => api.post(`/event/${id}/registrations`),

  leave: (id: string) => api.delete(`/event/${id}/registrations`),

  create: (data: CreateEventPayload) => api.post("/event/create", data),
};
