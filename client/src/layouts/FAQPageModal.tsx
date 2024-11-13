import Creezer from "@/assets/image/creezer.png";

const FAQPageModal = () => {
  return (
    <div className="flex gap-6 justify-start items-center">
      <img
        src={Creezer}
        alt="Creezer"
        className="w-16 md:w-20 border border-white"
      />
      <div>
        <h2 className="text-sm md:text-base">
          <p className="text-xl font-bold">No FAQ yet.</p>
          <p className="mt-2 opacity-75">This section will be updated soon!</p>
        </h2>
      </div>
    </div>
  );
};

export default FAQPageModal;
