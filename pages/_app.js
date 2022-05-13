import '../styles/globals.css';
import createEmotionCache from '../lib/createEmotionCache';
import {CssBaseline, ThemeProvider} from '@mui/material';
import theme from '../styles/theme';
import {CacheProvider} from '@emotion/react';
import {AuthProvider} from '../lib/contexts/AuthContext';
import {QueryClientProvider, QueryClient, Hydrate} from 'react-query';
// import {ReactQueryDevtools} from 'react-query/devtools';
import Layout from '../components/Layout';
import '@fontsource/permanent-marker';
import {useRef} from 'react';

const clientSideEmotionCache = createEmotionCache ();

export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}) {
  
  const queryClient = useRef (
    new QueryClient ({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
      },
    })
  );

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient.current}>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          <Hydrate state={pageProps.dehydratedState}>
          <AuthProvider>
            <CssBaseline />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AuthProvider>
          </Hydrate>
        </QueryClientProvider>
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
