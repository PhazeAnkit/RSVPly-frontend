import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { DashboardData } from "./dashboard.types";

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await api.get<{ data: DashboardData }>("/event/dashboard");
      return res.data.data;
    },
  });
}
