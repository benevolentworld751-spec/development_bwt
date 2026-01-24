import React from 'react';

const NewsLetter = () => {
  return (
    <div className="max-w-[1240px] mx-auto py-16 px-4 text-center bg-blue-600 text-white rounded-lg shadow-xl my-16">
      <h2 className="text-4xl font-bold mb-4">Subscribe to Our Newsletter</h2>
      <p className="text-lg mb-8">
        Get the latest travel deals, news, and tips delivered straight to your inbox!
      </p>
      
      <form className="flex flex-col sm:flex-row justify-center items-center gap-4 px-4">
        <input 
          type="email" 
          placeholder="Enter your email" 
          className="p-3 rounded-lg w-full sm:w-80 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button 
          type="submit" 
          className="bg-white text-blue-600 py-3 px-6 rounded-lg font-bold hover:bg-gray-100 transition-colors w-full sm:w-auto"
        >
          Subscribe
        </button>
      </form>
      
      <p className="text-sm mt-6 text-blue-100">
        We care about the protection of your data. Read our <a href="#" className="underline hover:text-white">Privacy Policy</a>.
      </p>
    </div>
  );
};

export default NewsLetter;