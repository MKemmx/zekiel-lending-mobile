import axios from "axios";

// Request Interface
import { ICreditLedger } from "../Interface/ICreditledger";

export const creditLedgerAPI = axios.create({
  baseURL: "http://192.168.0.110:5000/api/creditLedger",
});

export const createUtang = async (item: ICreditLedger) => {
  return await creditLedgerAPI.post("/", item);
};

export const createBayad = async (item: ICreditLedger) => {
  return await creditLedgerAPI.post("/", item);
};
