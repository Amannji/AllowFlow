"use client";

import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

export default function ConnectButton() {
  const { primaryWallet, handleLogOut, setShowAuthFlow } = useDynamicContext();
  const isConnected = !!primaryWallet;

  const handleConnect = () => {
    if (isConnected) {
      handleLogOut();
    } else {
      setShowAuthFlow(true);
    }
  };

  return (
    <button
      onClick={handleConnect}
      className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
    >
      {isConnected ? "Connected" : "Connect Wallet"}
    </button>
  );
}
