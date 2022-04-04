import '../styles/globals.css';
import {ClientContext, useQuery} from 'graphql-hooks';
import createEmotionCache from '../lib/createEmotionCache';
import {useGraphQLClient} from '../lib/graphql-client';
import {Container, CssBaseline, ThemeProvider} from '@mui/material';
import theme from '../styles/theme';
import {CacheProvider} from '@emotion/react';
import {GET_ME_QUERY} from '../lib/graphql-query-mutation';
import {AuthProvider} from '../lib/contexts/AuthContext';

const clientSideEmotionCache = createEmotionCache ();

export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}) {
  const graphQLClient = useGraphQLClient ();
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <ClientContext.Provider value={graphQLClient}>
          <AuthProvider>
            <CssBaseline />
            <Container maxWidth="lg">
              <Component {...pageProps} />
            </Container>
          </AuthProvider>
        </ClientContext.Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}

// App.getInitialProps = async appContext => {
//   const appProps = await App.getInitialProps (appContext);
//   // const {data: authData, error: authError} = useQuery (GET_ME_QUERY);
//   // // const auth = await getUser(appContext.ctx)

//   // if (authData) {
//   //   return {...appProps, auth: authData};
//   // }
// };
