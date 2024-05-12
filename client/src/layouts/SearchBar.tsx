import { Input } from "@/components/ui/input";

const SearchBar = () => {
  return (
    <div className="hidden sm:flex sm:rounded-xl sm:justify-center sm:content-center sm:bg-white h-9">
      {/* Region selector */}
      <div className="sm:flex justify-center content-center bg-[#182B40] rounded-l-lg px-4 py-0">
        <button className="text-white text-xs font-vollkorn">NA &#9662;</button>
      </div>

      {/* Summoner name form */}
      <form
        action=""
        className="flex justify-center content-center gap-3 px-2 py-1 w-full max-w-lg md:max-w-md sm:max-w-sm"
      >
        {/* Search box */}
        <Input
          placeholder="Summoner Name"
          className="w-full rounded-sm focus-visible:ring-transparent font-vollkorn text-xs pl-2 m-0"
        ></Input>
        {/* Magnifying glasses */}
        <button className="pr-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="feather feather-search"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
