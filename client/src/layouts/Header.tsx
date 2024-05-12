import SearchBar from "./SearchBar";
import NavBar from "./NavBar";

import LNLogo from "../assets/image/LNLogoSmall.png";

const Header = () => {
  return (
    <div className="flex justify-around items-center bg-[#11161D] px-10 py-5 w-full border-b border-gray-800">
      {/* Left side of header */}
      <div className="flex items-center gap-20">
        <button>
          <img src={LNLogo} alt="LN" className="w-24 h-8" />
        </button>
        <SearchBar></SearchBar>
      </div>

      {/* Right side of header */}
      <NavBar></NavBar>
    </div>
  );
};

export default Header;
