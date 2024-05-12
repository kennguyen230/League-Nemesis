import Header from "./layouts/Header";
import HomeSearchBox from "./layouts/HomePage/HomeSearchBox";
import Footer from "./layouts/Footer";

import HomePageBG from "./assets/image/HomePageBG.jpg";
import HPL from "./assets/image/LNLogoBig.png";
import HPBG from "./assets/svg/HomePageBg.svg";

export default function App() {
  return (
    <div className="min-h-screen bg-[#11161D]">
      <Header />

      {/* Background & home page search box */}
      <div
        className="flex flex-col items-center justify-center h-screen gap-5 bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${HomePageBG})`,
        }}
      >
        <img src={HPL} alt="" />
        <HomeSearchBox></HomeSearchBox>
      </div>

      <Footer></Footer>
    </div>
  );
}
