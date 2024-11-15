import { createConfig } from "wagmi";
import { http } from "wagmi";
import { sepolia } from "wagmi/chains";
import { createPublicClient, createWalletClient, custom } from "viem";

export const config = createConfig({
  chains: [sepolia],
  multiInjectedProviderDiscovery: false,
  transports: {
    [sepolia.id]: http(),
  },
});
export const ConnectPublicClient = () => {
  let transport;
  if (window.ethereum) {
    transport = custom(window.ethereum);
  } else {
    const errorMessage = "Metamask not found";
    throw new Error(errorMessage);
  }
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: transport,
  });

  return publicClient;
};

export const ConnectWalletClient = () => {
  let transport;
  if (window.ethereum) {
    transport = custom(window.ethereum);
  } else {
    const errorMessage = "Metamask not found";
    throw new Error(errorMessage);
  }
  const walletClient = createWalletClient({
    chain: sepolia,
    transport: transport,
  });

  return walletClient;
};
