import { Button } from "@/components/ui/button";

const GameTypeBar = () => {
  return (
    <div className="flex bg-gray-500 font-vollkorn">
      <Button className="w-26 h-7 text-xs bg-[#4377B5] border border-gray-300">
        All Matches
      </Button>
      <Button className="w-24 h-7 text-xs bg-gray-400 border border-gray-300">
        Normals
      </Button>
      <Button className="w-24 h-7 text-xs bg-gray-400 border border-gray-300">
        Ranked
      </Button>
      <Button className="w-24 h-7 text-xs bg-gray-400 border border-gray-300">
        ARAM
      </Button>
    </div>
  );
};

export default GameTypeBar;
