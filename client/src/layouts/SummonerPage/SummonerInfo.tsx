import { Button } from "@/components/ui/button";
import TeemoIcon from "../../assets/image/TeemoIcon.webp";

const SummonerInfo = () => {
  return (
    <div className="flex gap-3 justify-start items-center bg-gray-300 p-4 font-vollkorn">
      <img src={TeemoIcon} alt="Teemo" className="w-20 rounded-md" />
      <div className="flex flex-col">
        <div className="flex">
          <h1>Off Season</h1>
          <h3>#NA1</h3>
        </div>
        <h3>Level 350</h3>
        <Button className="w-24 h-10">Update</Button>
      </div>
    </div>
  );
};

export default SummonerInfo;
