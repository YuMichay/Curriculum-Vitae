import { AuthInput } from "cv-graphql";
import { useLazyQuery } from "@apollo/client";

import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { LOGIN } from "../graphQL/loginQuery";

export const useLogin = () => {
  const navigate = useNavigate();
  const [loginQuery, { data, loading, error }] = useLazyQuery(LOGIN);

  const login = async (input: AuthInput) => {
    const response = await loginQuery({ variables: { auth: input } });
    const accessToken = response?.data?.login?.access_token;
    const user = response?.data?.login?.user;

    if (!accessToken || !user) {
      throw new Error("Login failed: no access token or user");
    }

    Cookies.set("access_token", accessToken, {
      expires: 7,
      secure: true,
      sameSite: "strict",
    });
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/dashboard");
  };

  return { login, loading, error, data };
};