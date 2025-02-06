import "@/styles/globals.css";
import "pretendard/dist/web/static/pretendard.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
