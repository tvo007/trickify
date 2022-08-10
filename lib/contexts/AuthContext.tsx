import { createContext, ReactNode, useContext } from "react";
import router from "next/router";
import { useState } from "react";
import { loginAsAdmin } from "../api";
import { IUser } from "../interfaces";

export interface IAuthContext {
  user: IUser;
  tokens: string;
  isAuth: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export interface AuthContextProviderProps {
  children: ReactNode;
  value: IAuthContext;
}

const authContextDefaultValues: IAuthContext = {
  user: null,
  tokens: null,
  isAuth: false,
  login: () => Promise<void>,
  logout: () => {},
};

const AuthContext = createContext<IAuthContext>(authContextDefaultValues);

export const AuthProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<IUser>(null);
  const [tokens, setTokens] = useState<string>(null);
  const [isAuth, setIsAuth] = useState(false);

  /**login api call*/

  /**logout api call */

  const login = async (email: string, password: string) => {
    const formData = { email, password };
    const { user, token, error } = await loginAsAdmin(formData);

    if (error) {
      console.log(error);
    } else if (token && user) {
      setUser(user);
      setTokens(token);
      setIsAuth(true);
    }
  };
  //graphql mutation here

  //   const login = async (email, password) => {
  //     // Use any auth service methods here
  //     return await axios({
  //       method: 'post',
  //       url: `${process.env.NEXT_PUBLIC_API_URL}/login`,
  //       data: { email, password },
  //       withCredentials: true,
  //     })
  //       .then(() => {
  //         router.push('/');
  //         console.log('user signed in');
  //       })
  //       .catch((error) => {
  //         console.error('Incorrect email or password entered.);
  //       });
  //   };

  //   const register = async (email, password) => {
  //     return await axios({
  //       method: 'post',
  //       url: `${process.env.NEXT_PUBLIC_API_URL}/register`,
  //       data: { email, password },
  //       withCredentials: true,
  //     })
  //       .then(function (response) {
  //         router.push('/');
  //           console.log('user registered');
  //       })
  //       .catch(function (error) {
  //         console.error(error.message);
  //       });
  //   };

  const logout = async () => {
    // const {error} = await logout ({
    //   variables: {
    //     refresh_token: tokens.refresh_token,
    //   },
    // });

    // if (error) {
    //   console.log ('Failed on logging out. You are trapped here foreverrr');
    // } else {
    //   setUser (null);
    //   setTokens (null);
    //   router.push ('/login');
    // }
    setUser(null);
    setTokens(null);
    setIsAuth(false);
  };

  const context = {
    user,
    setUser,
    tokens,
    setTokens,
    login,
    logout,
    isAuth,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
