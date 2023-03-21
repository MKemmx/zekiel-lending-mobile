import axios from "axios";

export const creditLedgerAPI = axios.create({
  baseURL: "http://192.168.0.112:5000/api/creditLedger",
});

export const createCreditLedger = async (item: any) => {
  return await axios.post("/", item);
};

export const readCreditLedger = async (page: number, searchText: string) => {
  const { data } = await creditLedgerAPI.get(
    `/?page=${page}&searchItem=${searchText}`
  );
  return data;
};

export const updateCreditLedger = async (item: any) => {
  return await creditLedgerAPI.put(`/${item._id}`, item);
};

export const deleteCreditLedger = async (item: any) => {
  return await creditLedgerAPI.delete(`/${item._id}`);
};
