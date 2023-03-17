import * as Yup from "yup";

export const addUtangValidationSchema = Yup.object().shape({
  amount: Yup.string().required("This field is required"),
});
