import * as Yup from "yup";

export const userValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("This field is required"),
  middleName: Yup.string().required("Please type N/A if not applicable"),
  lastName: Yup.string().required("This field is required"),
  // address: Yup.string().required("This field is required"),
  // phoneNumber: Yup.string().required("This field is required"),
  // bankName: Yup.string().required("This field is required"),
  // accountNumber: Yup.string().required("This field is required"),
  // pinCode: Yup.string().required("This field is required"),
});
