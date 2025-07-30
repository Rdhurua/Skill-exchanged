import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 rounded-t-lg">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">About Us</h2>
          <p className="text-sm">
            Skill-Exchange is a platform where individuals connect, share, and learn new skills from each other. Join us and grow your expertise!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <a href="#About" className="hover:text-white transition">About</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">How It Works</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">Contact</a>
            </li>
            <li>
              <a href="#Faq" className="hover:text-white transition">FAQs</a>
            </li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Stay Connected</h2>
          <p className="text-sm mb-4">
            Email us at: <a href="mailto:support@skill-exchange.com" className="text-blue-400 hover:underline">support@skill-exchange.com</a>
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Skill-Exchange. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
