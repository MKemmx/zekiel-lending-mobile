export const addBayadInitialState = (userId: string) => {
  return {
    userRef: userId,
    amount: "",
    description: "",
    status: "utang",
  };
};
