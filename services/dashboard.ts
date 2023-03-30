import axios from "axios";

// Base URl
import { baseURL } from "./baseURL";
export const dashboardAPI = axios.create({
  baseURL: `${baseURL}/dashboard`,
});

import { useLoginStore } from "../store/loginStore";

export const readDashboard = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": useLoginStore.getState().token,
    },
  };

  const { data } = await dashboardAPI.get(`/`, config);
  return data;
};
