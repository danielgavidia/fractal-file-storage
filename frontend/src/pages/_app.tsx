import "@/styles/globals.css";
import LayoutMain from "@/layouts/layoutMain";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LayoutMain>
      <Component {...pageProps} />
    </LayoutMain>
  );
}
