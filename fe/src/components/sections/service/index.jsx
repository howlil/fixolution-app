import image1 from "public/s1.png";
import image2 from "public/s2.png";
import image3 from "public/s3.png";

export default function Service() {
  return (
    <section className="p-16 bg-neutral-900 text-center relative">
      <h1 className="text-white font-semibold text-3xl">
        MEET <br />
        OUR “SERVICE”
      </h1>
      <div className="grid grid-cols-3 my-12 gap-4">
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
