import YoutubeEmbed from "./ytembed";
import bg from "public/ban.png";

export default function Profile() {
  return (
    <section>
      <div className="relative ">
        <img src={bg} alt="bg" className="w-full  h-full object-cover" />
        <div className="absolute inset-0 top-0 bg-black bg-opacity-80 flex flex-col justify-center items-center text-white text-center p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold mb-4 sm:mb-8 md:mb-12 lg:mb-16 xl:mb-20">
            Here’s Our Profile Video <br/>
            For You
          </h1>
          
          <YoutubeEmbed videoId="out6RqCApvo" />
        </div>
      </div>
    </section>
  );
}