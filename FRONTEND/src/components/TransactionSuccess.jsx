import { useLocation, useNavigate } from "react-router-dom";
import PersonalNavbar from "./PersonalNavbar";

const TransactionSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const message = location.state?.message || "Transaction completed!";

    return (
        <div>
            <PersonalNavbar/>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
                <img className="h-20 w-20" src="/check.png" alt="check" />
                <h1 className="text-3xl font-bold text-green-400">{message}</h1>
                <button
                    className="mt-5 px-4 py-2 bg-blue-500 text-white rounded-lg"
                    onClick={() => navigate("/home")}
                >
                    Go to Home
                </button>
            </div>
        </div>
    );
};

export default TransactionSuccess;
