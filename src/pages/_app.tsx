import { PrinterDataProvider } from "@/context/printer-data.context";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PrinterDataProvider>
      <Component {...pageProps} />
      <ToastContainer />
    </PrinterDataProvider>
  );
}
