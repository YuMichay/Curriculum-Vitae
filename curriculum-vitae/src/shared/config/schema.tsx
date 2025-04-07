import * as yup from "yup";

export const schema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Email must be a valid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(
      /[a-z]/,
      "Password must contain at least one lowercase letter"
    )
    .matches(
      /[A-Z]/,
      "Password must contain at least one uppercase letter"
    )
    .matches(
      /\d/,
      "Password must contain at least one number"
    )
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one symbol"
    ),
});