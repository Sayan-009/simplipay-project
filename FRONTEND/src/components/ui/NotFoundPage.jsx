import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGhost } from "react-icons/fa";

const NotFoundPage = () => {
    return (
        <motion.div
            className="flex flex-col items-center justify-center h-screen text-center p-4 bg-gray-900 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <FaGhost className="text-9xl text-gray-500 animate-bounce" />
            </motion.div>
            <motion.h1
                className="text-6xl font-bold text-red-500 mt-4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
            >
                404
            </motion.h1>
            <motion.p
                className="text-xl mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
            >
                Oops! Looks like you're lost in the void.
            </motion.p>
            <motion.p
                className="text-gray-400 mt-2 mb-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
            >
                The page you are looking for might have been moved or never existed.
            </motion.p>
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
            >
                <Link to="/" className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-lg">
                    Take Me Home
                </Link>
            </motion.div>
        </motion.div>
    );
};

export default NotFoundPage;