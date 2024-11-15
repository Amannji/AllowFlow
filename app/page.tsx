"use client";

import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import ConnectButton from "./components/ConnectButton";
import LandingPage from "./components/LandingPage";
import MainApp from "./components/MainApp";

export default function Home() {
  const { primaryWallet } = useDynamicContext();
  const isConnected = !!primaryWallet;

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center bg-white/80 backdrop-blur-sm z-50">
        <div className="text-xl font-bold">AllowFlow</div>
        <ConnectButton />
      </header>

      <main className="pt-16">
        {isConnected ? <MainApp /> : <LandingPage />}
      </main>
    </div>
  );
}
