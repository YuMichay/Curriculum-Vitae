import { ResetPasswordInput } from "cv-graphql";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { RESET_PASSWORD } from "../graphQL/auth/resetPasswordQuery";

export const useResetPassword = () => {
  const navigate = useNavigate();
  const [resetPasswordQuery, { loading, error }] = useMutation(RESET_PASSWORD);

  const resetPassword = async (auth: ResetPasswordInput) => {
    try {
      const response = await resetPasswordQuery({ variables: { auth } });
  
      if (response.errors) {
        throw new Error("Reset password failed");
      }

      navigate("/auth/login");
    } catch (err) {
      console.error("Reset password failed: ", err);
    }
  };

  return { resetPassword, loading, error };
};
