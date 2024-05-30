import image1 from "public/s1.png";
import image2 from "public/s2.png";
import image3 from "public/s3.png";

export default function Service() {
  return (
    <section className="p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20 bg-neutral-900 text-center relative">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white font-semibold">
        MEET <br />
        OUR “SERVICE”
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-12">
        <img src={image1} alt="a" />
        <img src={image2} alt="a" />
        <img src={image3} alt="a" />
      </div>
      <a
        className="underline-offset-2 underline text-white "
      >
        View All
      </a>
    </section>
  );
}