import { Link } from "react-router-dom";


const ServerErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <h1 className="text-6xl font-bold text-red-600">500</h1>
      <p className="text-xl text-gray-700 mt-2">Internal Server Error</p>
      <p className="text-gray-500 mt-1">Something went wrong on our end. Please try again later.</p>
      <Link to="/" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Go Home
      </Link>
    </div>
  );
};

export default ServerErrorPage;