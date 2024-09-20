import React from "react";

export default function CardSukuCadang({ service }) {
  const { detail_pesanan, ringkasan_pesanan, status } = service;

  return (
    <div className="flex justify-between items-center border-b pb-4 mb-4 w-full bg-white p-4 rounded-md">
      {detail_pesanan.map((item, index) => (
        <div key={index} className="flex gap-6">
          <img
            className="w-36 h-36 object-cover rounded-lg"
            src={`${import.meta.env.VITE_API_BASE_URL}/fotoSukuCadang/${
              item.foto
            }`}
            alt={item.nama}
          />

          <div className="flex-1 space-y-4">
            <div>
              <span className="text-xs font-medium text-neutral-400">
                Suku Cadang
              </span>
              <h1 className="text-xl font-semibold mt-1">{item.nama}</h1>
            </div>
            <div>
              <p className="text-sm text-gray-600">
                Rp{item.harga.toLocaleString("id-ID")}
              </p>
              <p className="text-sm text-gray-600">
                Kuantitas: {item.kuantitas}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Total Price and Status */}
      <div className="flex flex-col items-end">
        <h1 className="text-xl font-semibold text-gray-800">
          Rp{ringkasan_pesanan.total.toLocaleString("id-ID")}
        </h1>
        <div className="mt-4">
          <span
            className={`px-4 py-2 rounded-md font-medium text-white ${
              status === "MENUNGGU_KONFIRMASI"
                ? "bg-orange-500"
                : status === "MENUNGGU_PEMBAYARAN"
                ? "bg-green-500"
                : status === "DITERIMA"
                ? "bg-green-500"
                : status === "DITOLAK"
                ? "bg-red-500"
                : ""
            }`}
          >
            {status === "MENUNGGU_KONFIRMASI" && "Menunggu Konfirmasi"}
            {status === "MENUNGGU_PEMBAYARAN" && "Menunggu Pembayaran"}
            {status === "DITERIMA" && "Selesai"}
            {status === "DITOLAK" && "Ditolak"}
          </span>
        </div>
      </div>
    </div>
  );
}
