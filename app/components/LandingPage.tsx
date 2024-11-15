export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-6xl font-bold mb-6">AllowFlow</h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl">
        Streamline your DeFi operations with AllowFlow - The next generation of
        decentralized finance management.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
        {features.map((feature, index) => (
          <div key={index} className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const features = [
  {
    title: "Smart Allowances",
    description:
      "Manage token allowances intelligently across multiple protocols",
  },
  {
    title: "Security First",
    description: "Advanced security features to protect your assets",
  },
  {
    title: "Cross-Chain Support",
    description: "Seamlessly operate across multiple blockchain networks",
  },
];
