import { MapPin, Phone } from "lucide-react";

export default function DescStg({ data }) {
  return (
    <div className="bg-neutral-700 p-4 mt-36 rounded-lg">
      <div className=" gap-4">
        <img
          className="w-full h-64 object-cover rounded-lg"
          src={
            data?.foto?.length > 0 &&
            `${import.meta.env.VITE_API_BASE_URL}/fotoBengkel/${
              data.foto[0].foto
            }`
          }
          alt={data?.nama_bengkel || "Bengkel Image"}
        />
        <div className="text-white mt-4 space-y-3">
          <h1 className="font-semibold text-2xl">
            {data?.nama_bengkel || "Nama Bengkel"}
          </h1>
          <div className="flex text-neutral-300 items-center gap-3">
            <Phone size={16} />
            <h1 className="text-sm">{data?.no_hp || "No HP tidak tersedia"}</h1>
          </div>
          <div className="flex justify-between text-neutral-300">
            <div className="text-neutral-300 flex items-center gap-3">
              <MapPin size={16} className="flex-shrink-0" />
              <h1 className="text-sm">
                {data?.alamat || "Alamat tidak tersedia"}
              </h1>
            </div>
            <h1 className="text-white flex-shrink-0 text-sm">
              <a
                href={data?.gmaps_link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {data?.gmaps_link
                  ? "Lihat di Google Maps"
                  : "Gmaps link tidak tersedia"}
              </a>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
