import LNLogoSmall from "@/assets/image/LNLogoSmall.png";
import SearchBar from "./SearchBar";

import { HamburgerMenu } from "./HamburgerMenu";
import { Link } from "@tanstack/react-router";

const Header = ({ showSearchBar }) => {
  return (
    <header className="flex flex-col md:flex-row sticky top-0 bg-[#11161D] p-4 justify-between items-center w-full z-50 shadow-lg">
      <div className="flex justify-between items-center w-full md:w-auto">
        {/* Top left logo */}
        <Link to="/">
          <img src={LNLogoSmall} alt="" className="w-20 ml-1 md:w-28" />
        </Link>

        {/* Top right hamburger menu for small screens */}
        <div className="md:hidden">
          <HamburgerMenu></HamburgerMenu>
        </div>
      </div>

      {/* Some instances of the header don't require a searchbar */}
      {showSearchBar && (
        <SearchBar height="h-10" fontSize="text-sm" isHomePage={false} />
      )}

      {/* Top right hamburger menu for large screens */}
      <div className="hidden md:block">
        <HamburgerMenu></HamburgerMenu>
      </div>
    </header>
  );
};

export default Header;
