import * as Yup from "yup";

export const addBayadValidationSchema = Yup.object().shape({
  amount: Yup.string().required("This field is required"),
});
