import { gql } from "@apollo/client";

export const REFRESH_TOKENS = gql`
  mutation refreshTokens {
    refreshTokens {
      accessToken
      refreshToken
    }
  }
`;

export const LOGIN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(data: { email: $email, password: $password }) {
      accessToken
      refreshToken
    }
  }
`;

export const SIGNUP = gql`
  enum Lang {
    DE
    EN
    PL
    UK
  }
  mutation SignUp($email: String!, $password: String!, $nativeLang: Lang!) {
    signUp(
      data: { email: $email, password: $password, nativeLang: $nativeLang }
    ) {
      accessToken
      refreshToken
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logOut
  }
`;
