import { useState } from "react";

const RegionDropdown = () => {
  const [selectedRegion, setSelectedRegion] = useState("NA");
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <div className="relative inline-block text-center">
      <div className="flex justify-center items-center bg-[#182B40] rounded-l-md w-16 lg:w-24 h-12 px-4 font-vollkorn">
        <button
          onClick={toggleDropdown}
          className="text-white text-xs lg:text-sm font-vollkorn flex items-center justify-center w-full"
        >
          {selectedRegion} &#9662;
        </button>
      </div>

      {isOpen && (
        <div className="absolute mt-1 w-16 lg:w-24 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-y-auto max-h-48 no-scrollbar">
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
