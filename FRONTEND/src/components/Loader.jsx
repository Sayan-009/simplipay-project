import { useState } from "react";

const Loader = ({ message }) => {
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
            <div className="flex space-x-2">
                <div className="w-5 h-5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                <div className="w-5 h-5 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-5 h-5 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
            </div>
            <p className="mt-4 text-lg font-semibold">{message}</p>
        </div>
    );
};

export default Loader;
