import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Hamburger Icon */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      {/* Menu Items */}
      <div
        className={`flex justify-around items-center gap-32 ${
          isOpen ? "flex" : "hidden"
        } md:flex`}
      >
        <button className="text-md text-white font-vollkorn hover:opacity-50 transition-opacity">
          About
        </button>
        <button className="text-md text-white font-vollkorn hover:text-opacity-50 transition-opacity">
          Contact
        </button>
      </div>
    </div>
  );
};

export default Navbar;
