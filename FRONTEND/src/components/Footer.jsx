import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        {/* Left: Logo + Name */}
        <div className="flex items-center space-x-2">
          <span className="text-xl font-semibold">SimpliPay</span>
        </div>

        {/* Center: Quick Links */}
        <nav className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white">Home</a>
          <a href="#" className="hover:text-white">About</a>
          <a href="#" className="hover:text-white">Services</a>
          <a href="#" className="hover:text-white">Contact</a>
        </nav>

        {/* Right: Social Icons */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-white"><FaFacebook size={20} /></a>
          <a href="#" className="hover:text-white"><FaTwitter size={20} /></a>
          <a href="#" className="hover:text-white"><FaLinkedin size={20} /></a>
          <a href="#" className="hover:text-white"><FaInstagram size={20} /></a>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-sm mt-6 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} SimpliPay. All rights reserved.
      </div>
    </footer>
  );
}
