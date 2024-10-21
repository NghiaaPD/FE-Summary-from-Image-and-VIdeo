import React from "react";
import { FaFacebook } from "react-icons/fa";

interface ContactInfoProps {
  show: boolean;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ show }) => {
  if (!show) return null;

  return (
    <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-inner">
      <ul className="space-y-2">
        <li>
          AI engineer - Công Bằng 
          <a href="https://www.facebook.com/congbang.bui.399" target="_blank" rel="noopener noreferrer" className="inline-flex items-center ml-2 text-blue-500">
            <FaFacebook className="mr-1" />
            Facebook
          </a>
        </li>
        <li>
          AI engineer - Đăng Doanh 
          <a href="https://www.facebook.com/Heromine99" target="_blank" rel="noopener noreferrer" className="inline-flex items-center ml-2 text-blue-500">
            <FaFacebook className="mr-1" />
            Facebook
          </a>
        </li>
        <li>
          AI engineer - Đức Nghĩa 
          <a href="https://www.facebook.com/nghiapd1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center ml-2 text-blue-500">
            <FaFacebook className="mr-1" />
            Facebook
          </a>
        </li>
        <li>
          AI engineer - Bảo Long 
          <a href="https://www.facebook.com/baolong608" target="_blank" rel="noopener noreferrer" className="inline-flex items-center ml-2 text-blue-500">
            <FaFacebook className="mr-1" />
            Facebook
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ContactInfo;
