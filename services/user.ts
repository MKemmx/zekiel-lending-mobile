import axios from "axios";

// Interface
import { IUser } from "../Interface/IUser";

export const userApi = axios.create({
  baseURL: "http://192.168.0.110:5000/api/user",
});

export const createUser = async (user: IUser) => {
  return await userApi.post("/", user);
};

export const readUser = async (page: number, searchText: string) => {
  const { data } = await userApi.get(
    `/search?page=${page}&searchItem=${searchText}`
  );
  return data;
};

export const readOneUser = async (userId: any) => {
  const { data } = await userApi.get(`/${userId}`);
  return data;
};

export const updateUser = async (user: IUser) => {
  return await userApi.put(`/${user._id}`, user);
};

export const deleteUser = async (user: IUser) => {
  return await userApi.delete(`/${user._id}`);
};
