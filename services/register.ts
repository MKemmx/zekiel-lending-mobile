import axios from "axios";

export const registerAPI = axios.create({
  baseURL: "http://192.168.0.112:5000/api/admin",
});

export const registerAccount = async (registrationData: any) => {
  const { data } = await registerAPI.post(`/`, registrationData);
  return data;
};
