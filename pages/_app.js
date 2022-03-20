import '../styles/globals.css';
import {ClientContext} from 'graphql-hooks';
import createEmotionCache from '../lib/createEmotionCache';
import {useGraphQLClient} from '../lib/graphql-client';
import {Container, CssBaseline, ThemeProvider} from '@mui/material';
import theme from '../styles/theme';
import {CacheProvider} from '@emotion/react';

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
          <CssBaseline />
          <Container maxWidth="lg">
            <Component {...pageProps} />
          </Container>
        </ClientContext.Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}
