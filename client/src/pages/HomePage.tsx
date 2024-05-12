import Header from "../layouts/Header";
import HomeSearchBox from "../layouts/HomePage/HomeSearchBox";
import Footer from "../layouts/Footer";

import HomePageBG from "./assets/image/HomePageBG.jpg";
import HPL from "./assets/image/LNLogoBig.png";

export default function App() {
  return (
    <div className="min-h-screen bg-[#11161D]">
      <Header />

      {/* Background & home page search box */}
      <div
        className="flex flex-col items-center justify-center h-[91vh] gap-5"
        style={{
          backgroundImage: `url(${HomePageBG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <img src={HPL} alt="" />
        <HomeSearchBox></HomeSearchBox>
      </div>
      <Footer></Footer>
    </div>
  );
}
