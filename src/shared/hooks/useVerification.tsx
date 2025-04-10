import { useMutation } from "@apollo/client";
import { VerifyMailInput } from "cv-graphql";
import { useNavigate } from "react-router-dom";

import { VERIFY_MAIL } from "../graphQL/auth/verifyMail.ts";

export const useVerification = () => {
  const navigate = useNavigate();
  const [verifyMailMutation, { loading, error }] = useMutation(VERIFY_MAIL);

  const verifyMail = async (otp: VerifyMailInput) => {
    try {
      const response = await verifyMailMutation({ variables: { mail: otp } });

      if (response.errors) {
        throw new Error("Verification failed");
      }

      navigate('/auth/login');
    } catch (err) {
      console.error("Verification failed: ", err);
    }
  };

  return { verifyMail, loading, error };
};
