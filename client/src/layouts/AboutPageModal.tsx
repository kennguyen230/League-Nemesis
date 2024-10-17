const AboutPageModal = () => {
  return (
    <div className="text-sm md:text-lg">
      <h2 className="mb-7">
        League Nemesis is a fun side project I've been working on to bring
        numerical data on who you should ban in champ select.
      </h2>
      <h2 className="mb-7">
        The website uses Riot's public api to gather as many games as possible
        to determine your League Nemesis. A League Nemesis can change based on
        the game mode (normals, ranked, etc) or lane selected.
      </h2>
      <h2>
        It is ultimately up to the player to ban their League Nemesis, but I
        hope the website provides keen insight into a player's matchups.
      </h2>
    </div>
  );
};

export default AboutPageModal;
