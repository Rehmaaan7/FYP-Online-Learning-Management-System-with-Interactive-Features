import React from "react";

const LoadingScreen = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="flex flex-col items-center space-y-6">

        {/* Spinner */}
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-gray-600 border-t-blue-500 animate-spin"></div>
          <div className="absolute inset-0 h-16 w-16 rounded-full bg-blue-500 opacity-20 blur-xl animate-pulse"></div>
        </div>

        {/* Text */}
        <div className="text-center">
          <h1 className="text-xl font-semibold text-white tracking-wide">
            Loading your experience
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Please wait while we fetch the data...
          </p>
        </div>

        {/* Dots animation */}
        <div className="flex space-x-2 mt-2">
          <span className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"></span>
          <span className="h-2 w-2 bg-blue-500 rounded-full animate-bounce delay-150"></span>
          <span className="h-2 w-2 bg-blue-500 rounded-full animate-bounce delay-300"></span>
        </div>

      </div>
    </div>
  );
};

export default LoadingScreen;