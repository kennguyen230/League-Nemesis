import LNLogoSmall from "@/assets/image/LNLogoSmall.png";

import RiotDisclaimer from "./RiotDisclaimer";
import { Link } from "@tanstack/react-router";

const Footer = () => {
  return (
    <footer>
      <nav className="flex justify-around items-center bg-[#11161D] p-12 font-vollkorn text-white">
        <Link to="/">
          <img src={LNLogoSmall} alt="" className="w-20 md:w-28" />
        </Link>
        <Link>
            About
        </Link>
        <Link>
            Contact
        </Link>
      </nav>
      <RiotDisclaimer></RiotDisclaimer>
    </footer>
  );
};

export default Footer;
