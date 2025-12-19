import { api } from "@/services/api";

export const authApi = {
  login: (data: { email: string; password: string }) =>
    api.post("/auth/login", data),

  register: (data: {
    userName: string;
    email: string;
    password: string;
    Location: string;
    contactNumber: string;
  }) => api.post("/auth/register", data),
};
