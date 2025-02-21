const SkeletonLoader = () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-900 text-white">
        <div className="animate-pulse">
          <div className="h-12 w-48 bg-gray-700 rounded-md mb-4"></div>
          <div className="h-8 w-32 bg-gray-600 rounded-md mb-2"></div>
          <div className="h-8 w-40 bg-gray-600 rounded-md mb-2"></div>
          <div className="h-8 w-28 bg-gray-600 rounded-md mb-2"></div>
        </div>
      </div>
    );
  };
  
  export default SkeletonLoader;
  