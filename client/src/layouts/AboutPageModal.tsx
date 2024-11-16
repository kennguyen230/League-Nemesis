import Creezer from "@/assets/image/creezer.png";

const AboutPageModal = () => {
  return (
    <div className="text-sm md:text-lg">
      <img
        src={Creezer}
        alt="Creezer"
        className="w-16 md:w-20 border border-white mb-7"
      />
      <h2 className="mb-7">
        League Nemesis is a fun side project I've been working on to bring
        numerical data to who you should ban.
      </h2>
      <h2 className="mb-7">
        The website uses Riot's public API to gather as many games as possible
        to determine your League Nemesis. A League Nemesis can change based on
        the game mode, such as normals or ranked, and lane selected.
      </h2>
      <h2>
        It is ultimately up to the player to ban their League Nemesis as this
        website is only a tool to keep the player informed.
      </h2>
    </div>
  );
};

export default AboutPageModal;
