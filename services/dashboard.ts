import axios from "axios";

export const dashboardAPI = axios.create({
  baseURL: "http://192.168.0.112:5000/api/dashboard",
});

export const readDashboard = async () => {
  const { data } = await dashboardAPI.get(`/`);
  return data;
};
