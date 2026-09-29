import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  const SocialIcon = ({ href, viewBox, d }) => (
    <a 
      href={href} 
      className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-gray-700 hover:bg-gray-800 hover:text-white transition-colors"
    >
      <svg viewBox={viewBox} width={16} height={16} fill="currentColor">
        <path d={d} />
      </svg>
    </a>
  );

  return (
    <div className="bg-gray-100">
      {/* Main Footer Content */}
      <div className="mx-auto px-4 mx-8 md:px-8 py-16 bg-white rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 md:gap-6">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <img src={assets.logo} width={120} alt="" />
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Seamless transactions, personalized insights, and innovative solutions for a smarter tomorrow.
            </p>
            {/* Social Media Icons */}
            <div className="flex gap-3">
              <SocialIcon 
                href="#" 
                viewBox="0 0 24 24"
                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
              />
              <SocialIcon 
                href="#" 
                viewBox="0 0 24 24"
                d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
              />
              <SocialIcon 
                href="#" 
                viewBox="0 0 24 24"
                d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.535 0 10 4.465 10 10s-4.465 10-10 10S2 17.535 2 12 6.465 2 12 2zm1.5 15.5a.72.72 0 100-1.44.72.72 0 000 1.44zm-5.09-7.46a2.73 2.73 0 015.46 0 2.73 2.73 0 11-5.46 0z"
              />
              <SocialIcon 
                href="#" 
                viewBox="0 0 24 24"
                d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.535 0 10 4.465 10 10s-4.465 10-10 10S2 17.535 2 12 6.465 2 12 2zm3.5 10.5a2 2 0 11-4 0 2 2 0 014 0zm-6.5 0a2 2 0 11-4 0 2 2 0 014 0z"
              />
              <SocialIcon 
                href="#" 
                viewBox="0 0 24 24"
                d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75-2.25 7-7 7-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
              />
            </div>
          </div>

          {/* About */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">About</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-gray-900 transition-colors">Company</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Leadership</a></li>
              <li><a href="/about" className="hover:text-gray-900 transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">Help</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-gray-900 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Support Team</a></li>
              <li><a href="/contact" className="hover:text-gray-900 transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Menu */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">Menu</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="/" className="hover:text-gray-900 transition-colors">Men</a></li>
              <li><a href="/collection" className="hover:text-gray-900 transition-colors">Women</a></li>
              <li><a href="/orders" className="hover:text-gray-900 transition-colors">Children</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Popular</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="/about" className="hover:text-gray-900 transition-colors">About us</a></li>
              <li><a href="/contact" className="hover:text-gray-900 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">News & Blogs</a></li>
              <li><a href="/login" className="hover:text-gray-900 transition-colors">Login</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <p>Copyright © 2025 RJ Golds All Rights Reserved.</p>
          <a href="#" className="mt-4 md:mt-0 hover:text-gray-900 transition-colors">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
