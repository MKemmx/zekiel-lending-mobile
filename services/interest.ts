import axios from "axios";

// Base URl
import { baseURL } from "./baseURL";
export const interestAPI = axios.create({
  baseURL: `${baseURL}/interest`,
});
import { useLoginStore } from "store/loginStore";

export const getUserInterest = async (item: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": useLoginStore.getState().token,
    },
  };
  return await interestAPI.post("/user-interest", item, config);
};

export const createUserInterest = async (item: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": useLoginStore.getState().token,
    },
  };
  return await interestAPI.post("/", item, config);
};
