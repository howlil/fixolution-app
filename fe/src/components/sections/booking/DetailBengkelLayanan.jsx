import { MapPin, Phone } from "lucide-react";

export default function DetailBengkelLayanan({ data }) {
  return (
    <div className="bg-neutral-700 p-6 mt-36  rounded-lg">
      <div className="flex gap-4">
        <img
          className="w-36 h-36 object-cover rounded-lg"
          src={`${import.meta.env.VITE_API_BASE_URL}/fotoBengkel/${
            data.foto[0].foto
          }`}
          alt="data"
        />
        <div className="text-white space-y-3">
          <h1 className="font-semibold text-xl">{data.nama_bengkel}</h1>
          <div className="flex text-neutral-300 items-center gap-3">
            <Phone size={16} />
            <h1 className=" text-sm">{data.no_hp}</h1>
          </div>
          <div className="flex justify-between text-neutral-300">
            <div className="text-neutral-300 flex items-center gap-3">
              <MapPin size={16} />
              <h1 className="text-sm">{data.alamat}</h1>
            </div>
            <h1 className="text-white text-sm">{data.gmaps_link}</h1>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h1 className="text-2xl text-white font-semibold">Layanan Bengkel</h1>
        {/* Tabel layanan */}
        <table className="min-w-full mt-4 border-separate border-spacing-y-2">
          <thead>
            <tr className="text-white">
              <th className="p-4 text-left bg-neutral-800 rounded-tl-lg">
                Nama Layanan
              </th>
              <th className="p-4 text-left bg-neutral-800">Jam Operasional</th>
              <th className="p-4 text-left bg-neutral-800 rounded-tr-lg">
                Kisaran Harga
              </th>
            </tr>
          </thead>
          <tbody>
            {data.layanan.map((layanan, index) => (
              <tr key={index} className="text-white">
                <td className="p-4 bg-neutral-600 rounded-l-lg">
                  {layanan.nama_layanan}
                </td>
                <td className="p-4 bg-neutral-600">
                  {layanan.jam_buka} - {layanan.jam_tutup}
                </td>
                <td className="p-4 bg-neutral-600 rounded-r-lg">{`Rp${layanan.harga}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
