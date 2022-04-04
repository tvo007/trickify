import {createContext} from 'react';
import router from 'next/router';
import {
  useQuery,
  ClientContext,
  GraphQLClient,
  useMutation,
} from 'graphql-hooks';
import {
  GET_ME_QUERY,
  LOGIN_MUTATION,
  LOGOUT_MUTATION,
} from '../graphql-query-mutation';
import {useContext, useState} from 'react';

export const systemClient = new GraphQLClient ({
  url: process.env.NEXT_PUBLIC_API_URL + '/system',
});

const AuthContext = createContext ({
  user: null,
  tokens: null,
});

export const AuthProvider = ({children}) => {
  const client = useContext (ClientContext);
  const [user, setUser] = useState (null);
  const [tokens, setTokens] = useState (null);

  const [login] = useMutation (LOGIN_MUTATION, {client: systemClient});

  const [logout] = useMutation (LOGOUT_MUTATION, {client: systemClient});

  const loginHandler = async (email, password) => {
    // Use any auth service methods here
    const {data, error} = await login ({
      variables: {
        email: email,
        password: password,
      },
    });

    if (error) {
      console.log ('Login failed due to an error.');
    } else {
      const {access_token, refresh_token} = data.auth_login;
      client.setHeader ('Authorization', `Bearer ${access_token}`);
      console.log ({
        access_token,
        refresh_token,
        message: 'User login successful.',
      });
      router.push ('/');
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
    const {error} = await logout ({
      variables: {
        refresh_token: tokens.refresh_token,
      },
    });

    if (error) {
      console.log ('Failed on logging out. You are trapped here foreverrr');
    } else {
      setUser (null);
      setTokens (null);
      router.push ('/login');
    }
  };

  const context = {
    user,
    setUser,
    tokens,
    setTokens,
    loginHandler,
    logoutHandler,
  };

  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
