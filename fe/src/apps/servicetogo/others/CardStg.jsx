import { MapPin, Phone } from "lucide-react";
import Button from "../../../components/ui/Button";

export default function CardStg({ data, onClick }) {
  return (
    <div className="grid ,md:mx-12 mx-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row bg-neutral-800 text-white shadow-md rounded-lg"
        >
          <img
            src={`${import.meta.env.VITE_API_BASE_URL}/fotoBengkel/${
              item.foto?.[0]?.foto
            }`}
            alt={item.title}
            className=" h-56 md:h-48 md:w-36 object-cover rounded-l-lg"
          />
          <div className="md:p-4 p-6 flex flex-col justify-between flex-1">
            <h3 className="card-title text-xl font-semibold">
              {item.nama_bengkel}
            </h3>
            <div className="my-4 space-y-1">
              <p className="flex items-center text-sm gap-3 text-gray-300">
                <MapPin size={16} className="flex-shrink-0" />
                {item.alamat.length > 50
                  ? `${item.alamat.slice(0, 50)}...`
                  : item.alamat}
              </p>
            </div>
            <div className="flex  justify-between items-center">
              <Button
                onClick={() => onClick(item.id)}
                variant="primary"
                custom="rounded-md px-4 py-1.5 text-sm"
              >
                Pilih
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
