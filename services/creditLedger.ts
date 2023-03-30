import axios from "axios";
export const creditLedgerAPI = axios.create({
  baseURL: "http://192.168.0.112:5000/api/creditLedger",
});

import { useLoginStore } from "../store/loginStore";

export const createCreditLedger = async (item: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": useLoginStore.getState().token,
    },
  };

  return await axios.post("/", item, config);
};

export const readCreditLedger = async (page: number, searchText: string) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": useLoginStore.getState().token,
    },
  };

  const { data } = await creditLedgerAPI.get(
    `/?page=${page}&searchItem=${searchText}`,
    config
  );
  return data;
};

export const updateCreditLedger = async (item: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": useLoginStore.getState().token,
    },
  };

  return await creditLedgerAPI.put(`/${item._id}`, item, config);
};

export const deleteCreditLedger = async (item: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": useLoginStore.getState().token,
    },
  };

  return await creditLedgerAPI.delete(`/${item._id}`, config);
};
