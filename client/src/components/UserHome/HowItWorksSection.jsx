import React from "react";
import { UserPlus, LogIn, Eye, ShieldCheck } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      step: 1,
      title: "Add Residents",
      desc: "Easily register residents with their details for a secure and organized community.",
      icon: <UserPlus className="w-8 h-8 text-green-600" />,
    },
    {
      step: 2,
      title: "Log Visitors",
      desc: "Keep track of visitors effortlessly and maintain secure entry logs safely and efficiently.",
      icon: <LogIn className="w-8 h-8 text-green-600" />,
    },
    {
      step: 3,
      title: "Monitor Activities",
      desc: "Track visitor check-ins, maintenance requests, and document submissions in real time.",
      icon: <Eye className="w-8 h-8 text-green-600" />,
    },
    {
      step: 4,
      title: "Admin Control",
      desc: "Admins can efficiently manage permissions, residents, and visitors with full control.",
      icon: <ShieldCheck className="w-8 h-8 text-green-600" />,
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-blue-50 px-6">
      <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
        How It Works
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {steps.map((s) => (
          <div
            key={s.step}
            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
          >
            <div className="mb-4">{s.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
            <p className="text-gray-600">{s.desc}</p>
            <div className="mt-4 text-green-600 font-bold text-lg">Step {s.step}</div>
          </div>
        ))}
      </div>

     
      <div className="hidden md:flex justify-between max-w-6xl mx-auto mt-12">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`flex-1 h-1 bg-blue-200 ${index === steps.length - 1 ? "hidden" : ""}`}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
