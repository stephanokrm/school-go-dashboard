import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";
import CssBaseline from "@mui/material/CssBaseline";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { ptBR } from "date-fns/locale";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ResponsiveDrawer } from "../src/components/ResponsiveDrawer";

const clientSideEmotionCache = createEmotionCache();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      retryOnMount: false,
    },
  },
});

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const globalStyles = (
  <GlobalStyles
    styles={{
      body: {
        backgroundColor: theme.palette.primary.main,
      },
    }}
  />
);

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      {/*@ts-ignore*/}
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <LocalizationProvider
            adapterLocale={ptBR}
            dateAdapter={AdapterDateFns}
          >
            <CssBaseline />
            {globalStyles}
            {/*@ts-ignore*/}
            <ResponsiveDrawer>
              {/*@ts-ignore*/}
              <Component {...pageProps} />
            </ResponsiveDrawer>
          </LocalizationProvider>
        </ThemeProvider>
      </CacheProvider>
    </QueryClientProvider>
  );
}
