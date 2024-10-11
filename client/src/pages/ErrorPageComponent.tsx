import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";

const ErrorPageComponent = () => {
  return (
    <div className="bg-summoner-page-bg bg-contain h-full">
      <Header isSearchBar={true} />
      <div className="h-screen bg-[#182B40] bg-center py-10 font-vollkorn md:mx-64 md:p-10 md:flex md:justify-center md:items-start">
        <div className="flex flex-col gap-4 justify-center items-center border bg-red-500 h-80 md:w-11/12">
          <h1 className="text-center text-lg text-white md:text-2xl">
            No search results for BLANK in the BLANK region.
          </h1>
          <h2 className="text-center text-gray-50 text-opacity-75 text-sm">
            Make sure your search is in the format SummonerName#Region
          </h2>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ErrorPageComponent;
