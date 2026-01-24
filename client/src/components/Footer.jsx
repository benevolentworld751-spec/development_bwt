import React from "react";
import {
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import LogoImg from "../assets/logo.png"; // ✅ adjust path if needed

const Footer = () => {
  return (
    <div className="w-full bg-gray-900 text-gray-300 py-8 px-2">
      <div className="max-w-[1240px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 border-b-2 border-gray-600 py-8 gap-8">

        {/* ✅ Company Logo Section */}
        <div className="col-span-2 flex flex-col items-center md:items-start">
          <img
            src={LogoImg}
            alt="Benevolent World Travel Logo"
            className="w-28 h-28 object-cover rounded-full shadow-md mb-4"
          />
          <h2 className="text-xl font-bold text-white">Benevolent World Travel</h2>
          <p className="text-gray-400 mt-2 text-sm text-center md:text-left">
            Explore the world with comfort, confidence, and care.
          </p>
        </div>

        {/* ✅ Solutions */}
        <div>
          <h6 className="font-bold uppercase pt-2">Solutions</h6>
          <ul>
            <li className="py-1">Travel</li>
            <li className="py-1">Booking</li>
            <li className="py-1">Flights</li>
            <li className="py-1">Cruises</li>
            <li className="py-1">Ground</li>
          </ul>
        </div>

        {/* ✅ Support */}
        <div>
          <h6 className="font-bold uppercase pt-2">Support</h6>
          <ul>
            <li className="py-1">Pricing</li>
            <li className="py-1">Documentation</li>
            <li className="py-1">Guides</li>
            <li className="py-1">API Status</li>
          </ul>
        </div>

        {/* ✅ Company */}
        <div>
          <h6 className="font-bold uppercase pt-2">Company</h6>
          <ul>
            <li className="py-1">About</li>
            <li className="py-1">Blog</li>
            <li className="py-1">Jobs</li>
            <li className="py-1">Press</li>
            <li className="py-1">Partners</li>
          </ul>
        </div>

        {/* ✅ Legal */}
        <div>
          <h6 className="font-bold uppercase pt-2">Legal</h6>
          <ul>
            <li className="py-1">Claims</li>
            <li className="py-1">Privacy</li>
            <li className="py-1">Terms</li>
            <li className="py-1">Policies</li>
            <li className="py-1">Conditions</li>
          </ul>
        </div>
      </div>

      {/* ✅ Bottom Section */}
      <div className="flex flex-col max-w-[1240px] px-2 py-4 mx-auto justify-between sm:flex-row text-center text-gray-500">
        <p className="py-4">
          © 2025 Benevolent World Travel, LLC. All rights reserved.
        </p>

        <div className="flex justify-center sm:justify-between sm:w-[300px] pt-4 text-2xl space-x-4">
          <a
            href="https://www.facebook.com/profile.php?id=61583518707287"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-transform transform hover:scale-110"
          >
            <FaFacebook />
          </a>
          <a
            href="https://www.linkedin.com/in/benevolent-world-travel-996a34395/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-transform transform hover:scale-110"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.instagram.com/su.pport874/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition-transform transform hover:scale-110"
          >
            <FaInstagram />
          </a>
          <a
            href="https://x.com/Benev35149World"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-500 transition-transform transform hover:scale-110"
          >
            <FaTwitter />
          </a>
          <a
            href="https://in.pinterest.com/benevolentworld/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-500 transition-transform transform hover:scale-110"
          >
            <FaPinterest />
          </a>
          <a
            href="https://www.youtube.com/@BenevolentWorld-t4f"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-600 transition-transform transform hover:scale-110"
          >
            <FaYoutube />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
