import '../styles/globals.css';
import createEmotionCache from '../lib/createEmotionCache';
import {CssBaseline, ThemeProvider} from '@mui/material';
import theme from '../styles/theme';
import {CacheProvider} from '@emotion/react';
import {AuthProvider} from '../lib/contexts/AuthContext';
import {QueryClientProvider, QueryClient} from 'react-query';
// import {ReactQueryDevtools} from 'react-query/devtools';
import Layout from '../components/Layout';
import '@fontsource/permanent-marker';

const clientSideEmotionCache = createEmotionCache ();

const queryClient = new QueryClient ({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          <AuthProvider>
            <CssBaseline />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AuthProvider>
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
