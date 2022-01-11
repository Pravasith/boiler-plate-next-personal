import "@styles/globals.css";
import "@assets/sass/global.scss";

import type { AppProps } from "next/app";

import Layout from "@components/Layout";

// import NProgress from 'nprogress' //nprogress module -- INTENTIONAL COMMENT
// import '../src/assets/sass/nprogress.scss' //styles of nprogress -- INTENTIONAL COMMENT

import { LoadingContextProvider } from "@utils/contexts/loadingContexts";

export default function App({ Component, pageProps, router }: AppProps) {
    return (
        <LoadingContextProvider>
            <Layout>
                <Component {...pageProps} key={router.route} />
            </Layout>
        </LoadingContextProvider>
    );
}
