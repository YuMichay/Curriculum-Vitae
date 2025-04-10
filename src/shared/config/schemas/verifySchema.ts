import * as yup from "yup";

export const verifyEmailSchema = yup.object({
  otp: yup
    .string()
    .required("Verification code is required")
    .length(6, "Code must be exactly 6 digits")
    .matches(/^\d+$/, "Code must be numeric"),
});