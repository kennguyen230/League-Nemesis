import { Input } from "@/components/ui/input";

const SmallSearchBar = () => {
  return (
    <div className="flex min-w-[22rem] max-w-[50rem] w-full px-4 h-12">
      {/* Region selector */}
      <div className="flex justify-center items-center bg-[#182B40] rounded-l-md p-4 w-20 ">
        <button className="text-white text-xs lg:text-sm font-vollkorn">
          NA &#9662;
        </button>
      </div>

      {/* Summoner name input */}
      <form action="" className="w-full flex font-vollkorn">
        <Input
          placeholder="Summoner Name"
          className="border-none w-full h-full rounded-none rounded-r-md focus-visible:ring-offset-0 focus-visible:ring-0"
        ></Input>
      </form>
    </div>
  );
};

export default SmallSearchBar;
