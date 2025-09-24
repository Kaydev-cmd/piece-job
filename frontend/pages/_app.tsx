import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout/Layout";
import { JobPostProvider } from "@/context/JobPostContext";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <JobPostProvider>
        <Component {...pageProps} />
      </JobPostProvider>
    </Layout>
  );
}
