import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          SocialHub
        </Link>

        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          <Link to="/whatsapp" className="hover:text-blue-600">
            WhatsApp
          </Link>
          <Link to="/instagram" className="hover:text-blue-600">
            Instagram
          </Link>
          <Link to="/youtube" className="hover:text-blue-600">
            YouTube
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Signup
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
