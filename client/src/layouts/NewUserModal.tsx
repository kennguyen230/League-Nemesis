import Creezer from "@/assets/image/creezer.png";
import { Loader2 } from "lucide-react";

const NewUserModal = ({ isLoading }) => {
  return (
    <div className="flex flex-col md:flex-row gap-8 items-center h-fit">
      <img
        src={Creezer}
        alt="Creezer"
        className="w-16 md:w-20 border border-white"
      />
      <div>
        <p className="text-xl font-bold">
          Looks like you're searching for a new user!
        </p>
        <p className="mt-2 opacity-75">
          It takes more time to process a new user than a returning one.
        </p>
        <p className="mt-2 opacity-75">Thanks for being patient!</p>
      </div>
      {isLoading && <Loader2 className="animate-spin" />}
    </div>
  );
};

export default NewUserModal;
