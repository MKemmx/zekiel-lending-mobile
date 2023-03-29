import axios from "axios";

export const loginAPI = axios.create({
  baseURL: "http://192.168.0.112:5000/api/login",
});

export const loginService = async (loginData: any) => {
  console.log(1);
  const { data } = await loginAPI.post(`/`, loginData);
  return data;
};
