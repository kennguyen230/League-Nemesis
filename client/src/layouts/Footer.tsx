import { Link } from "@tanstack/react-router";

const Footer = () => {
  return (
    <footer className="bg-[#11161D] flex flex-col md:flex-row py-12 gap-6">
      <nav className="flex justify-evenly items-center gap-12 font-vollkorn text-white mx-4 md:mx-64 text-xs md:text-sm border md:border-0 py-4 md:px-4">
        <Link>About</Link>
        <Link>Contact</Link>
      </nav>

      <section className="font-vollkorn text-white md:mx-64 mx-4 text-xs">
        LeagueNemesis.lol is not endorsed by Riot Games and does not reflect the
        views or opinions of Riot Games or anyone officially involved in
        producing or managing League of Legends. League of Legends and Riot
        Games are trademarks or registered trademarks of Riot Games, Inc. League
        of Legends © Riot Games, Inc.
      </section>
    </footer>
  );
};

export default Footer;
