import LNLogoSmall from "@/assets/image/LNLogoSmall.png";
import { Link } from "@tanstack/react-router";

const Header = ({ SearchBar }) => {
  return (
    <div className="flex bg-[#11161D] py-5 px-6 justify-between items-center w-full">
      {/* Top left logo */}
      <Link to="/">
        <img src={LNLogoSmall} alt="" className="w-20 md:w-28" />
      </Link>

      {/* Optionally passed in search bar */}
      {/* <SearchBar></SearchBar> */}

      {/* Top right hamburger menu */}
      <button>
        <i className="fa-solid fa-bars fa-xl" style={{ color: "#ffffff" }}></i>
      </button>
    </div>
  );
};

export default Header;
