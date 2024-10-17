import Creezer from "@/assets/image/creezer.png";

const ContactPageModal = () => {
  return (
    <div className="flex gap-6 justify-center items-center">
      <img
        src={Creezer}
        alt="Creezer"
        className="w-16 md:w-20 border border-white"
      />
      <div>
        <h2 className="text-sm md:text-base">
          If you have any suggestions or questions feel free to reach out to my
          Discord by clicking on Creezer.
        </h2>
      </div>
    </div>
  );
};

export default ContactPageModal;
