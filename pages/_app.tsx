import type { AppProps } from "next/app";
import { ThirdwebProvider, localWallet, metamaskWallet, smartWallet } from "@thirdweb-dev/react";
import { ChakraProvider } from "@chakra-ui/react";
import { API_KEY, FACTORY_ADDRESS } from "../constant/addresses";
import Navbar from "../components/Navbar";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "mumbai";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider 
      activeChain={activeChain}
      supportedWallets={[
        smartWallet({
          factoryAddress: FACTORY_ADDRESS,
          thirdwebApiKey: API_KEY,
          gasless: true,
          personalWallets:[
            metamaskWallet(),
            localWallet()
          ]
        })
      ]}
    >
      <ChakraProvider>
        <Navbar />
        <Component {...pageProps} />
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
