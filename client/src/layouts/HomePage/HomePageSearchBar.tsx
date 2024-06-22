import SmallSearchBar from "../SmallSearchBar.tsx";

import { Button } from "@/components/ui/button.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const HomePageSearchBar = () => {
  return (
    <>
      <SmallSearchBar></SmallSearchBar>
      <Button className="hidden md:block lg:w-28 mt-2 bg-[#182B40] font-vollkorn">
        Search
      </Button>
    </>
  );
};

export default HomePageSearchBar;
