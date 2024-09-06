import image1 from "public/our.png";
import image2 from "public/s2.png";
import image3 from "public/s3.png";
import { useNavigate } from "react-router-dom";

export default function Service() {
  const navigate = useNavigate();
  const cardData = [
    {
      image: image1,
      title: "Booking Bengkel",
      to: "/booking-bengkel",
      description:
        "Booking cepat dengan bantuan pencarian lokasi bengkel terdekat! Ayo daftarkan akunmu sekarang!.",
    },
    {
      image: image3,
      title: "Service To Go",
      to: "/service-to-go",
      description:
        "Memesan melalui website dimana saja dan kapan pun. Siap sedia untuk memberikan layanan langsung tanpa harus repot ke bengkel",
    },
    {
      image: image2,
      title: "Suku Cadang",
      to: "/suku-cadang",
      description:
        "Temukan suku cadang asli berkualitas untuk performa optimal kendaraan Anda. Jaminan keandalan dan keamanan di setiap perjalanan.",
    },
  ];

  return (
    <section className="p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20 bg-neutral-900 text-center relative">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white font-semibold">
        MEET <br />
        OUR “SERVICE”
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-12">
        {cardData.map((card, index) => (
          <CardService
            key={index}
            image={card.image}
            title={card.title}
            description={card.description}
            onClick={() => navigate(card.to)}
          />
        ))}
      </div>
      <a className="underline-offset-2 underline text-white ">View All</a>
    </section>
  );
}

const CardService = ({ onClick, image, title, description }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white text-start hover:shadow-xl hover:shadow-gray-700 ts p-4 rounded-lg shadow-lg"
    >
      <img
        src={image}
        alt="a"
        className="w-full h-64 object-cover rounded-md mb-4"
      />
      <h1 className="text-xl font-semibold">{title}</h1>
      <p>{description}</p>
    </div>
  );
};
