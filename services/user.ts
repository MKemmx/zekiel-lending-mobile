import { useLoginStore } from "../store/loginStore";

import axios from "axios";
// Base URl
import { baseURL } from "./baseURL";
export const userApi = axios.create({
  baseURL: `${baseURL}/user`,
});

// Interface
import { IUser } from "../Interface/IUser";

export const createUser = async (formData: any) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
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
