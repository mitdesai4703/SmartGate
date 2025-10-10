import React from "react";

const TestimonialsSection = () => {
  const testimonials = [
    { name: "John Doe", feedback: "SmartGate made managing visitors so easy!" },
    { name: "Jane Smith", feedback: "I love the maintenance tracking feature. Super convenient." },
    { name: "Ravi Patel", feedback: "Secure admin portal gives us peace of mind." },
  ];

  return (
    <section className="py-20 bg-white px-4">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">What People Say</h2>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-green-50 p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col gap-3">
            <p className="text-gray-700 italic">"{t.feedback}"</p>
            <span className="text-green-400 font-semibold mt-2">{t.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
