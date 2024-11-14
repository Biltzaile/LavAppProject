import { api } from "@/api";
import { AppConfig } from "@/models";

export const configService = {
  getConfig: () => api.get("/config"),
  updateConfig: (data: AppConfig) => api.put("/config", data),
};
