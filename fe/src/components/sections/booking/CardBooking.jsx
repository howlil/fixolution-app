import { MapPin, Phone } from "lucide-react";
import Button from "../../ui/Button";

export default function CardBooking({ data }) {
  return (
    <div className="grid mx-12 grid-cols-1 md:grid-cols-3  lg:grid-cols-4  gap-4">
      {data.map((item, index) => (
        <div
          key={index}
          className="card bg-neutral-800 text-white shadow-md rounded-lg "
        >
          <img
            src={item.img}
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
            <div className="flex  justify-between items-center">
              <Button variant="primary" custom=" rounded-md  px-4 py-1.5 text-sm">
                Booking
              </Button>
              <a
                href={item.link_maps}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-sm"
              >
                Buka Maps
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
