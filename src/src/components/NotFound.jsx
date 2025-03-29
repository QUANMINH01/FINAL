import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white text-center p-6">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold mb-6 animate-pulse">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Oops! Page Not Found</h2>
        <p className="text-xl mb-8">
          It seems the page you’re looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="bg-pink-600 hover:bg-pink-700 text-white text-lg py-3 px-8 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105"
        >
          Go Back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
