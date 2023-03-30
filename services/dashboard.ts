import axios from "axios";
export const dashboardAPI = axios.create({
  baseURL: "http://192.168.0.112:5000/api/dashboard",
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
