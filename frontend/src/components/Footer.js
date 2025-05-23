import React from 'react';
import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from 'react-icons/fa6';
import logo from '../assets/icons/id-main-logo.svg'; // adjust if needed

function Footer() {
  return (
    <footer className="bg-white shadow-md py-6 px-4 border-t border-gray-200">
      <div className="max-w-screen-lg mx-auto text-left">
        {/* Logo */}
        <div className="flex items-center mb-4">
          <img src={logo} alt="InsuranceDekho Logo" className="h-6 mr-2" />
        </div>

        {/* Social Icons */}
        <div className="flex gap-5 mb-4 text-gray-600 text-xl">
          <a
            href="https://www.facebook.com/insurancedekhoofficial#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebookF className="hover:text-blue-600 cursor-pointer" />
          </a>
          <a
            href="https://www.youtube.com/channel/UCbgggXkm7oIpqS9ushr4jKw"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <FaYoutube className="hover:text-red-600 cursor-pointer" />
          </a>
          <a
            href="https://www.instagram.com/insurancedekhoofficial/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram className="hover:text-pink-500 cursor-pointer" />
          </a>
          <a
            href="https://www.linkedin.com/company/insurancedekho/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn className="hover:text-blue-700 cursor-pointer" />
          </a>
          <a
            href="https://x.com/Insurance_Dekho"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <FaXTwitter className="hover:text-black cursor-pointer" />
          </a>
        </div>

        {/* Contact Info */}
        <div className="text-sm text-gray-600">
          <p>
            <strong>Email :</strong>{' '}
            <a
              href="mailto:support@insurancedekho.com"
              className="text-blue-600 hover:underline"
            >
              support@insurancedekho.com
            </a>
          </p>
          <p>
            <strong>Call :</strong>{' '}
            <a href="tel:7551196989" className="text-gray-800 hover:underline">
              755 1196 989
            </a>
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-4 text-xs text-gray-400">
          © {new Date().getFullYear()} InsuranceDekho. All rights reserved @ITD.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
