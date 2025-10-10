import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 text-center">
      &copy; {new Date().getFullYear()} SmartGate. All rights reserved.
    </footer>
  );
};

export default Footer;
