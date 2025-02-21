import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative flex flex-col-reverse md:flex-row items-center justify-between h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6 md:px-20">

      {/* Left Content */}
      <div className="relative z-10 text-center md:text-left max-w-2xl">
        <motion.h1
          className="text-5xl md:text-6xl font-bold leading-tight"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          The Future of <span className="text-blue-500">Secure Payments</span>
        </motion.h1>

        <motion.p
          className="mt-4 text-lg text-gray-300"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Experience seamless and futuristic transactions with next-level security and speed.
        </motion.p>

        {/* Call-to-Action Button */}
        <motion.div
          className="mt-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link
            to="/register"
            className="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
          >
            Get Started
          </Link>
        </motion.div>
      </div>

      {/* Right Side: 3D Image + Transaction Cards */}
      <div className="relative">
        {/* 3D Floating Card Animation */}
        <motion.div
          className="relative w-96 md:w-[450px] h-[280px] bg-gray-800 rounded-xl shadow-lg flex items-center justify-center"
          initial={{ rotateY: 180 }}
          animate={{ rotateY: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <img
            src="/hero-image.webp"
            alt="3D Payment Illustration"
            className="w-80 md:w-full rounded-lg"
          />
        </motion.div>

        {/* Floating Transaction Cards */}
        <motion.div
          className="absolute top-10 left-0 bg-white text-gray-900 px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        >
          <span className="text-green-500 font-semibold">+ $700</span>
          <span className="text-xs">Received</span>
        </motion.div>

        <motion.div
          className="absolute bottom-10 right-0 bg-white text-gray-900 px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        >
          <span className="text-red-500 font-semibold">- $400</span>
          <span className="text-xs">Sent</span>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
