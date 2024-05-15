import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import "./styles.css";
import { StoreProvider } from "../context/Store";
import { ThemeProvider } from "next-themes";

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <ThemeProvider attribute="class" enableSystem={true}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </ThemeProvider>
    </StoreProvider>
  );
}

export default CustomApp;
