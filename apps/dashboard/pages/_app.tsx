import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import './styles.css';
import { StoreProvider } from '../context/Store';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
    </StoreProvider>
  );
}

export default CustomApp;