import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";

import { Button } from "@/components/ui/button";
import { Link, useRouter } from "@tanstack/react-router";

const ErrorRootPageComponent = () => {
  const { history } = useRouter();
  return (
    <div className="bg-summoner-page-bg bg-contain h-full">
      <Header showSearchBar={true} />
      <div className="h-screen bg-[#182B40] bg-center py-16 font-vollkorn md:mx-64 md:p-10 md:flex md:justify-center md:items-start">
        <div className="flex flex-col gap-4 px-4 justify-center items-center border bg-red-500 h-96 md:w-11/12">
          <h1 className="text-center text-lg text-white md:text-2xl">
            Please try again.
          </h1>
          <h2 className="text-center text-gray-50 text-opacity-75 text-sm">
            The page you are looking for is no longer available or has been
            changed to a different page.
          </h2>
          <h2 className="text-center text-gray-50 text-opacity-75 text-sm">
            Please check the URL.
          </h2>
          <div className="flex gap-4 mt-4">
            <Button onClick={() => history.go(-1)} className="bg-[#182B40]">
              Go Back
            </Button>
            <Link to="/">
              <Button className="bg-[#182B40]">Home</Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ErrorRootPageComponent;
