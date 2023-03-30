import { useLoginStore } from "../store/loginStore";

import axios from "axios";
// Base URl
import { baseURL } from "./baseURL";
export const creditLedgerAPI = axios.create({
  baseURL: `${baseURL}/creditLedger`,
});

//  Interface
import { ICreditLedger } from "../Interface/ICreditledger";

export const createUtang = async (item: ICreditLedger) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": useLoginStore.getState().token,
    },
  };
  return await creditLedgerAPI.post("/", item, config);
};

export const createBayad = async (item: ICreditLedger) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": useLoginStore.getState().token,
    },
  };
  return await creditLedgerAPI.post("/", item, config);
};
