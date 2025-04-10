import { ForgotPasswordInput } from "cv-graphql";
import { useMutation } from "@apollo/client";

import { FORGOT_PASSWORD } from "../graphQL/auth/forgotPasswordQuery.ts";

export const useForgotPassword = () => {
  const [forgotPasswordQuery, { loading, error }] = useMutation(FORGOT_PASSWORD);

  const forgotPassword = async (auth: ForgotPasswordInput) => {
    try {
      const response = await forgotPasswordQuery({ variables: { auth } });

      if (response.errors) {
        throw new Error("Reset password failed");
      }
    } catch (err) {
      console.error("Reset password failed: ", err);
    }
  };

  return { forgotPassword, loading, error };
};
