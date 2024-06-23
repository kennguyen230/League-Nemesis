import { useState, useRef, useEffect } from "react";

const RegionDropdown = () => {
  const [selectedRegion, setSelectedRegion] = useState("NA");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const regions = [
    "NA",
    "KR",
    "EUW",
    "EUNE",
    "JP",
    "OCE",
    "BR",
    "LAN",
    "LAS",
    "RU",
    "TR",
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-center" ref={dropdownRef}>
      {/* The region selector button */}
      <div className="flex justify-center items-center bg-[#182B40] rounded-l-md w-16 md:w-24 h-12 px-4 font-vollkorn hover:bg-[#182B40]/95">
        <button
          onClick={toggleDropdown}
          className="text-white text-xs md:text-sm font-vollkorn flex items-center justify-center w-full"
        >
          {selectedRegion} &#9662;
        </button>
      </div>
      {/* The dropdown menu */}
      {isOpen && (
        <div className="absolute mt-1 w-16 md:w-24 rounded-md shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-y-auto max-h-48 no-scrollbar">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => handleRegionSelect(region)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                role="menuitem"
              >
                {region}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RegionDropdown;
