import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout/Layout";
import { JobPostProvider } from "@/context/JobPostContext";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import { AuthContextProvider } from "@/context/AuthContext";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Layout>
        <ErrorBoundary>
          <JobPostProvider>
            <Component {...pageProps} />
          </JobPostProvider>
        </ErrorBoundary>
      </Layout>
    </AuthContextProvider>
  );
}
