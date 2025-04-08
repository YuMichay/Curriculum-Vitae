import { useMutation } from "@apollo/client";
import { AuthInput } from "cv-graphql";

import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { SIGNUP } from "../graphQL/auth/signupQuery";

export const useSignup = () => {
  const navigate = useNavigate();
  const [signupMutation, { loading, error }] = useMutation(SIGNUP);

  const signup = async (data: AuthInput) => {
    try {
      const response = await signupMutation({ variables: { auth: data } });

      const accessToken = response?.data?.signup?.access_token;
      const user = response?.data?.signup?.user;
  
      if (!accessToken || !user) {
        throw new Error("Signup failed: no access token or user");
      }

      Cookies.set("access_token", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/verify-email");
    } catch (err) {
      console.error("Sign Up failed: ", err);
    }
  };

  return { signup, loading, error };
};