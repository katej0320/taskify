import "@/styles/globals.css";
import "pretendard/dist/web/static/pretendard.css";
import type { AppProps } from "next/app";
import { DashboardProvider } from "@/src/contexts/DashBoardContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DashboardProvider>
      <Component {...pageProps} />
    </DashboardProvider>
  );
}
