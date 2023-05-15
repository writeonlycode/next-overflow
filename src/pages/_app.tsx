import { useState } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

import Header from "@/components/header/Header";
import Footer from "@/components/Footer";

import "@/styles/globals.scss";
import {SWRConfig} from "swr";

export default function App({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession} >
      <SWRConfig value={pageProps.fallback ? { fallback: pageProps.fallback } : {}}>
        <Head>
          <title>Next Overflow</title>
          <meta
            name="description"
            content="Next Overflow is a StackOverflow clone that will allow users to ask and answer questions on a variety of topics, search for existing questions, and upvote/downvote answers."
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="flex min-h-screen flex-col">
          <Header />
          <Component {...pageProps} />
          <Footer />
        </div>
      </SWRConfig>
    </SessionContextProvider>
  );
}
