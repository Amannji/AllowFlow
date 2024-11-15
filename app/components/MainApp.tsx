"use client";

import { useEnsName } from "wagmi";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useState, useEffect } from "react";
import EnsRegistrationModal from "./EnsRegistrationModal";

export default function MainApp() {
  const { primaryWallet } = useDynamicContext();
  const { data: ensName } = useEnsName({
    address: primaryWallet?.address as `0x${string}`,
  });
  const [showEnsModal, setShowEnsModal] = useState(false);

  useEffect(() => {
    // Show modal if no ENS name is found
    if (!ensName && primaryWallet?.address) {
      setShowEnsModal(true);
    }
  }, [ensName, primaryWallet?.address]);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">
          Welcome,{" "}
          {ensName ||
            primaryWallet?.address?.slice(0, 6) +
              "..." +
              primaryWallet?.address?.slice(-4)}
        </h2>
      </div>
      {/* Add your main app functionality here */}

      {showEnsModal && (
        <EnsRegistrationModal
          onClose={() => setShowEnsModal(false)}
          walletAddress={primaryWallet?.address || ""}
        />
      )}
    </div>
  );
}
