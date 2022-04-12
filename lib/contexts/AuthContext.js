import {createContext} from 'react';
import router from 'next/router';
import {useState} from 'react';
import {login} from '../api';

const AuthContext = createContext ({
  user: null,
  tokens: null,
  isAuth: false
});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState (null);
  const [tokens, setTokens] = useState (null);
  const [isAuth, setIsAuth] = useState(false)

  /**login api call*/

  /**logout api call */

  const loginHandler = async (email, password) => {
    const formData = {email, password};
    const {user, token, error} = await login (formData);

    if (error) {
      console.log (error);
    } else if (token && user) {
      setUser (signIn.user.id);
      setTokens (signIn.token);
      setIsAuth(true)
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

  const logoutHandler = async () => {
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
    setUser (null);
    setTokens (null);
  };

  const context = {
    user,
    setUser,
    tokens,
    setTokens,
    loginHandler,
    logoutHandler,
    isAuth
  };

  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
