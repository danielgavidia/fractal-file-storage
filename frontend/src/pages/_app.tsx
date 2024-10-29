import "@/styles/globals.css";
import LayoutMain from "@/layouts/LayoutMain";
import { AuthProvider } from "@/components/AuthProvider";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <LayoutMain>
        <Component {...pageProps} />
      </LayoutMain>
    </AuthProvider>
  );
}
