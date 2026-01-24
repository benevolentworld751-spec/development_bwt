const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-6xl font-bold mb-4 text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mb-6">Oops! Page not found.</p>
      <a href="/" className="text-blue-600 underline hover:text-blue-800">
        Go to Home
      </a>
    </div>
  );
};

export default NotFound;
