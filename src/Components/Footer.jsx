import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-blue-200">
      {/* Main container */}
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-start py-10 px-6 md:px-20 gap-10 md:gap-20">

        {/* Left Section */}
        <div className="flex flex-col gap-4 w-full md:w-1/3 items-center md:items-start text-center md:text-left">
          <img
            src={assets.logo}
            alt="Logo"
            className="w-24 h-24 rounded-full object-cover shadow-lg"
          />
          <p className="text-black text-sm leading-relaxed">
            Nova HealthCare is a modern, patient-focused hospital committed to delivering quality healthcare with compassion and innovation.
          </p>
        </div>

        {/* Center Section */}
        <div className="flex flex-col gap-3 w-full md:w-1/4 text-center md:text-left">
          <p className="font-bold text-xl text-black">Company</p>
          <ul className="flex flex-col gap-2 text-black text-sm">
            {["Home", "About Us", "Contact Us", "Privacy Policy"].map((item) => (
              <li
                key={item}
                className="hover:text-blue-600 transition-colors duration-300 cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-3 w-full md:w-1/4 text-center md:text-right">
          <p className="font-bold text-xl text-black">Get in Touch</p>
          <ul className="flex flex-col gap-2 text-black text-sm">
            <li>📞 0411 198 123</li>
            <li>📧 Novahealth@gmail.com</li>
          </ul>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-end gap-4 mt-3">
            {[
              { href: "https://facebook.com", icon: assets.facebook, alt: "Facebook" },
              { href: "https://twitter.com", icon: assets.twitter, alt: "Twitter" },
              { href: "https://linkedin.com", icon: assets.linkedin, alt: "LinkedIn" },
            ].map(({ href, icon, alt }) => (
              <a
                key={alt}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-300"
              >
                <img
                  src={icon}
                  alt={alt}
                  className="w-6 h-6 filter grayscale brightness-0 hover:grayscale-0 hover:brightness-100 transition-all duration-300"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-white opacity-50 w-full" />

      {/* Bottom */}
      <div className="py-4 text-center text-xs text-gray-500">
         {new Date().getFullYear()} Nova HealthCare — All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
