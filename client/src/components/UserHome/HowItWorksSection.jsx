import React from "react";

const HowItWorksSection = () => {
  const steps = [
    { step: 1, title: "Register Residents", desc: "Add and verify residents for secure access." },
    { step: 2, title: "Log Visitors", desc: "Visitors can be logged easily at entry." },
    { step: 3, title: "Track Activities", desc: "Monitor visitor check-ins, maintenance requests and documents." },
    { step: 4, title: "Secure Admin Controls", desc: "Admins can manage residents, visitors, and permissions." },
  ];

  return (
    <section className="py-20 bg-gray-50 px-4">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How It Works</h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {steps.map((s) => (
          <div key={s.step} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col gap-3">
            <div className="text-green-400 font-bold text-2xl mb-2">Step {s.step}</div>
            <h3 className="text-xl font-semibold">{s.title}</h3>
            <p className="text-gray-600">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
