import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useToast } from './ToastContext';

function PersonalNavbar({ userImage }) {

    const navigate = useNavigate();
    const {showToast} = useToast();

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('accessToken')
            const response = await axios.get("http://localhost:5000/api/v1/users/logout", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');

            console.log(response.data);
            showToast("Logged out successfully!", "info");
            navigate("/")
        } catch (error) {
            console.log(error.message || "User not validated")
            showToast(error.message, "error")
        }
    }

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
                    SimpliPay
                </Link>

                {/* Links */}
                <div className="flex space-x-6">
                    <button onClick={handleLogout} className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                        Logout
                    </button>
                    <img src={userImage} alt="user image" className="w-7 h-7 rounded-full" />
                </div>
            </div>
        </nav>
    )
}

export default PersonalNavbar;