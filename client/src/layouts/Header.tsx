import LNLogoSmall from "../assets/image/LNLogoSmall.png";

const Header = ({ SearchBar }) => {
  return (
    <div className="flex bg-[#11161D] py-4 px-6 justify-between items-center">
      <img src={LNLogoSmall} alt="" className="w-20 lg:w-28" />
      {/* <SearchBar></SearchBar> */}
      <button>
        <i className="fa-solid fa-bars fa-xl" style={{ color: "#ffffff" }}></i>
      </button>
    </div>
  );
};

export default Header;
