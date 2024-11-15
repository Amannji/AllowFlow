"use client";

import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "./config/config";
const queryClient = new QueryClient();
export const Providers = ({ children }: { children: React.ReactNode }) => (
  <DynamicContextProvider
    settings={{
      environmentId: "139e515f-5b64-4bdb-9a7e-ab7244166b2f",
      walletConnectors: [EthereumWalletConnectors],
    }}
  >
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  </DynamicContextProvider>
);

export default Providers;
