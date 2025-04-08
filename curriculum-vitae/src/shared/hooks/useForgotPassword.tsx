import { ForgotPasswordInput } from "cv-graphql";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { FORGOT_PASSWORD } from "../graphQL/auth/forgotPasswordQuery";

export const useForgotPassword = () => {
  const navigate = useNavigate();
  const [forgotPasswordQuery, { loading, error }] = useMutation(FORGOT_PASSWORD);

  const forgotPassword = async (auth: ForgotPasswordInput) => {
    try {
      const response = await forgotPasswordQuery({ variables: { auth } });
  
      if (response.errors) {
        throw new Error("Reset password failed");
      }

      navigate("/reset-password");
    } catch (err) {
      console.error("Reset password failed: ", err);
    }
  };

  return { forgotPassword, loading, error };
};