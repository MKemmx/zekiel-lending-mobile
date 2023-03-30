import axios from "axios";

// Base URl
import { baseURL } from "./baseURL";
export const loginAPI = axios.create({
  baseURL: `${baseURL}/api/login`,
});

export const loginService = async (loginData: any) => {
  const { data } = await loginAPI.post(`/`, loginData);
  return data;
};
