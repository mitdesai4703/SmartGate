import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Mail, MapPin, Phone } from "lucide-react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/contact`, formData);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 py-12 px-6">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl grid md:grid-cols-2 overflow-hidden">
       
        <div className="bg-green-600 text-white p-12 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-4">Let’s Connect!</h2>
          <p className="text-green-100 mb-8">
            Have questions, feedback, or ideas? We’re here to listen. Reach out and we’ll get back to you as soon as possible.
          </p>

          <div className="space-y-6 text-sm">
            <div className="flex items-center gap-3">
              <MapPin size={20} className="text-green-100" /> 
              <span>123 Smart Residency, Pune, India</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={20} className="text-green-100" /> 
              <span>support@smartgate.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={20} className="text-green-100" /> 
              <span>+91 98765 43210</span>
            </div>
          </div>
        </div>

       
        <div className="p-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full border border-green-300 rounded-lg p-4 focus:ring-2 focus:ring-green-500 outline-none shadow-sm"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full border border-green-300 rounded-lg p-4 focus:ring-2 focus:ring-green-500 outline-none shadow-sm"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="6"
              required
              className="w-full border border-green-300 rounded-lg p-4 focus:ring-2 focus:ring-green-500 outline-none resize-none shadow-sm"
            ></textarea>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-4 rounded-lg transition shadow-md"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
