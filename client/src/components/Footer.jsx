import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-14 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center sm:text-left">
        
       
        <div>
          <h2 className="text-3xl font-bold text-white">SmartGate</h2>
          <p className="mt-3 text-sm text-gray-400 leading-relaxed">
            SmartGate is a modern residential management platform that connects 
            residents, admins, and security seamlessly — simplifying communication, 
            maintenance tracking, and visitor management.
          </p>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-blue-400 transition">Home</a>
            </li>
            <li>
              <a href="/about" className="hover:text-blue-400 transition">About Us</a>
            </li>
            <li>
              <a href="/features" className="hover:text-blue-400 transition">Features</a>
            </li>
            <li>
              <a href="/pricing" className="hover:text-blue-400 transition">Pricing</a>
            </li>
            <li>
              <a href="/faq" className="hover:text-blue-400 transition">FAQ</a>
            </li>
          </ul>
        </div>

       
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/blog" className="hover:text-blue-400 transition">Blog</a>
            </li>
            <li>
              <a href="/privacy-policy" className="hover:text-blue-400 transition">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms" className="hover:text-blue-400 transition">Terms & Conditions</a>
            </li>
            <li>
              <a href="/support" className="hover:text-blue-400 transition">Support</a>
            </li>
            <li>
              <a href="/community" className="hover:text-blue-400 transition">Community</a>
            </li>
          </ul>
        </div>

     
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex items-center justify-center sm:justify-start gap-2">
              <Mail size={16} className="text-blue-400" />
              support@smartgate.com
            </li>
            <li className="flex items-center justify-center sm:justify-start gap-2">
              <Phone size={16} className="text-blue-400" />
              +91 98765 43210
            </li>
            <li className="flex items-center justify-center sm:justify-start gap-2">
              <MapPin size={16} className="text-blue-400" />
              123 Green Valley, Mumbai, India
            </li>
          </ul>

          <div className="flex justify-center sm:justify-start mt-5 space-x-4">
            <a href="#" className="hover:text-blue-400 transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      <hr className="border-gray-700 my-8" />
<div className="max-w-7xl mx-auto flex justify-center items-center text-sm text-gray-500 text-center">
  <p>
    &copy; {new Date().getFullYear()}{" "}
    <span className="text-white font-medium">SmartGate</span>. All rights reserved.
  </p>
</div>

    </footer>
  );
};

export default Footer;
