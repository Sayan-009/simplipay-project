import { Link } from "react-router-dom"; // If using React Router

export default function Navbar() {
    return (
        <nav className="bg-white dark:bg-gray-900 shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
                    SimpliPay
                </Link>

                {/* Links */}
                <div className="flex space-x-6">
                    <Link to="/register" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border-b-2 border-transparent hover:border-blue-500 transition-all duration-300">
                        Register
                    </Link>
                    <Link to="/login" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border-b-2 border-transparent hover:border-blue-500 transition-all duration-300">
                        Login
                    </Link>
                </div>
            </div>
        </nav>


    );
}
