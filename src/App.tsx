import { useState } from "react";
import ImageVideoSumary from "./pages/imageVideoSumary/ImageVideoSumary";
import ContactInfo from "./components/contactInfo";
import About from "./components/About"; // Import component About
import "./App.css";

function App() {
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [currentContent, setCurrentContent] = useState("home"); // Quản lý trạng thái hiển thị nội dung

  const handleContactClick = () => {
    setShowContactInfo(!showContactInfo);
  };

  const handleMenuClick = (menuItem: string) => {
    setCurrentContent(menuItem);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-gray-200">
      <header className="bg-gradient-to-r from-teal-400 to-blue-500 text-white py-4 shadow-lg">
        <h1 className="text-center text-2xl sm:text-3xl font-bold">
          Image and Video Summary Tool
        </h1>
      </header>

      <main className="flex-1 container mx-auto p-6 grid grid-cols-1 sm:grid-cols-5 gap-4">
        <aside
          className={`max-h-48 col-span-1 p-4 bg-white shadow-lg rounded-lg ${
            showContactInfo ? "max-h-96" : "max-h-48"
          }`}
        >
          <h2 className="text-xl font-semibold mb-4">MENU</h2>
          <ul className="space-y-3">
            <li>
              <a
                href="#"
                className="nav-item text-indigo-600 hover:text-indigo-800"
                onClick={() => handleMenuClick("home")}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="nav-item text-indigo-600 hover:text-indigo-800"
                onClick={() => handleMenuClick("about")}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="nav-item text-indigo-600 hover:text-indigo-800"
                onClick={handleContactClick}
              >
                Contact
              </a>
            </li>
          </ul>
          <ContactInfo show={showContactInfo} />
        </aside>

        <div className="col-span-4 p-4 bg-white shadow-lg rounded-lg">
          {currentContent === "home" && <ImageVideoSumary />}
          {currentContent === "about" && <About />}{" "}
          {/* Sử dụng component About */}
        </div>
      </main>
    </div>
  );
}

export default App;
