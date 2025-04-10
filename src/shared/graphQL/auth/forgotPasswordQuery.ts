import { gql } from "@apollo/client";

export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($auth: ForgotPasswordInput!) {
    forgotPassword(auth: $auth)
  }
`;