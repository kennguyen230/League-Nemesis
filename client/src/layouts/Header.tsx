import LNLogoSmall from "../assets/image/LNLogoSmall.png";

const Header = () => {
  return (
    <div className="flex bg-[#11161D] p-6 justify-between items-center">
      <img src={LNLogoSmall} alt="" className="w-20 lg:w-28" />
      <button>
        <i className="fa-solid fa-bars fa-xl" style={{ color: "#ffffff" }}></i>
      </button>
    </div>
  );
};

export default Header;
