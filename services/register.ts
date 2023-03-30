import axios from "axios";

// Base URl
import { baseURL } from "./baseURL";
export const registerAPI = axios.create({
  baseURL: `${baseURL}/admin`,
});

export const registerAccount = async (registrationData: any) => {
  const { data } = await registerAPI.post(`/`, registrationData);
  return data;
};
