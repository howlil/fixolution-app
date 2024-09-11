import { MapPin, Phone } from "lucide-react";
import Button from "../../ui/Button";

export default function CardBooking({ data, onClick }) {
  return (
    <div className="grid mx-12 grid-cols-1 md:grid-cols-3  lg:grid-cols-4  gap-4">
      {data.map((item, index) => (
        <div
          key={index}
          className="card bg-neutral-800 text-white shadow-md rounded-lg "
        >
          <img
            src={`${import.meta.env.VITE_API_BASE_URL}/fotoBengkel/${
              item.foto[0].foto
            }`}
            alt={item.title}
            className="card-img w-full h-48 object-cover rounded-t-lg"
          />
          <div className="p-4">
            <h3 className="card-title text-xl font-semibold ">{item.title}</h3>
            <div className="my-4 space-y-1">
              <p className="flex items-center text-sm gap-3 text-gray-300">
                <Phone size={16} /> {item.no_hp}
              </p>
              <p className=" flex items-center text-sm gap-3 text-gray-300">
                <MapPin size={16} /> {item.alamat}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <Button
                onClick={() => onClick(item.id)} // Mengirimkan ID saat diklik
                variant="primary"
                custom="rounded-md px-4 py-1.5 text-sm"
              >
                Booking
              </Button>
              {item.gmaps_link && (
                <a
                  href={item.gmaps_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-sm"
                >
                  Buka Maps
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
