"use client";
import { useState } from "react";

import { namehash, labelhash } from "viem/ens";
import { encodeFunctionData, Address } from "viem";
import { ConnectWalletClient, ConnectPublicClient } from "../config/config";

interface EnsRegistrationModalProps {
  onClose: () => void;
  walletAddress: string;
}

export default function EnsRegistrationModal({
  onClose,
  walletAddress,
}: EnsRegistrationModalProps) {
  const [proposedEnsName, setProposedEnsName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSaveEns = async (
    proposedEnsName: string,
    walletAddress: string
  ) => {
    const contractAddress = "0xfc7c70400926ebb91e4f442d80a3e7f336dfb17"; // Replace with your L2 registry contract address on Sepolia
    const PUBLIC_RESOLVER = "0x00f9314C69c3e7C37b3C7aD36EF9FB40d94eDDe1"; // Replace with the correct resolver address for Sepolia

    const contractABI = [
      {
        name: "setSubnodeRecord",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [
          { name: "parentNode", type: "bytes32" },
          { name: "label", type: "bytes32" },
          { name: "owner", type: "address" },
          { name: "resolver", type: "address" },
          { name: "ttl", type: "uint64" },
        ],
        outputs: [],
      },
    ];

    try {
      // Basic validation for the subdomain name
      if (!proposedEnsName.match(/^[a-zA-Z0-9-]+$/)) {
        throw new Error(
          "ENS name can only contain letters, numbers, and hyphens"
        );
      }

      // Generate the node and label hashes
      const parentNode = namehash("allowflow.eth"); // Hash of the main domain
      const labelHash = labelhash(proposedEnsName); // Hash for the subdomain (e.g., "username")

      // Check if the subdomain is already owned
      const currentOwner = await ConnectPublicClient().readContract({
        address: contractAddress as Address,
        abi: contractABI,
        functionName: "owner",
        args: [labelHash],
      });

      if (currentOwner !== "0x0000000000000000000000000000000000000000") {
        throw new Error("This subdomain is already taken");
      }

      // Encode the data for setSubnodeRecord
      const setSubnodeData = encodeFunctionData({
        abi: contractABI,
        functionName: "setSubnodeRecord",
        args: [
          parentNode,
          labelHash,
          walletAddress as Address,
          PUBLIC_RESOLVER,
          BigInt(0), // TTL set to zero
        ],
      });

      // Send the transaction to create the subdomain
      const hash = await ConnectWalletClient().sendTransaction({
        to: contractAddress as Address,
        data: setSubnodeData,
        account: walletAddress as Address,
      });

      // Wait for the transaction to be mined
      const receipt = await ConnectPublicClient().waitForTransactionReceipt({
        hash,
      });

      if (receipt.status === "success") {
        console.log(`Successfully registered ${proposedEnsName}.allowflow.eth`);
      } else {
        throw new Error("Transaction failed");
      }
    } catch (error) {
      console.error("Failed to save ENS name:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-xl font-bold mb-4">Register Your ENS Name</h3>
        <p className="text-gray-600 mb-4">
          No ENS name is associated with your address. Choose your unique ENS
          name:
        </p>
        <input
          type="text"
          value={proposedEnsName}
          onChange={(e) => setProposedEnsName(e.target.value)}
          placeholder="yourname.eth"
          className="w-full p-2 border rounded mb-4"
        />
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={() => handleSaveEns(proposedEnsName, walletAddress)}
            disabled={isSubmitting || !proposedEnsName}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
