import * as Yup from "yup";

export const registerValidation = Yup.object().shape({
  userName: Yup.string().required("Username is required!"),
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});
