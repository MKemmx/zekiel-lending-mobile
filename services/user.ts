import { useLoginStore } from "../store/loginStore";

import axios from "axios";
export const userApi = axios.create({
  baseURL: "http://192.168.0.112:5000/api/user",
});

// Interface
import { IUser } from "../Interface/IUser";

export const createUser = async (formData: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": useLoginStore.getState().token,
    },
  };
  return await userApi.post("/", formData, config);
};

export const readUser = async (page: number, searchText: string) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": useLoginStore.getState().token,
    },
  };
  const { data } = await userApi.get(
    `/?page=${page}&searchItem=${searchText}`,
    config
  );
  return data;
};

export const readOneUser = async (userId: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": useLoginStore.getState().token,
    },
  };
  const { data } = await userApi.get(`/${userId}`, config);
  return data;
};

export const updateUser = async (user: IUser) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": useLoginStore.getState().token,
    },
  };
  return await userApi.put(`/${user._id}`, user, config);
};

export const deleteUser = async (user: IUser) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": useLoginStore.getState().token,
    },
  };
  return await userApi.delete(`/${user._id}`, config);
};
