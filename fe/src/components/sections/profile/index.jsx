import YoutubeEmbed from "./ytembed";
import bg from "public/ban.png";

export default function Profile() {
  return (
    <section className="relative">
      <div className="relativetransition-opacity ts duration-1000 ">
        <img src={bg} alt="bg" className="w-full h-full object-cover" />
        <div className="absolute inset-0 top-0 bg-black bg-opacity-80 flex flex-col justify-center items-center text-white text-center p-4">
          <h1 className="text-4xl font-semibold mb-20">
            Here’s Our Profile Video <br/>
            For You
          </h1>

          <YoutubeEmbed videoId="out6RqCApvo" />
        </div>
      </div>
    </section>
  );
}