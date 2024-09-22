import React from "react";
import { MapPin } from "lucide-react";

export default function CardService({ service, tipe }) {
  const { bengkel, deskripsi, status, gmaps_link, user } = service;

  return (
    <div className="border-b-2 pb-4 flex flex-col md:flex-row justify-between md:items-center mb-4 w-full bg-white p-2 md:p-4">
      {/* Gambar */}
      <div className="flex gap-6">
        <img
          className="md:w-36 md:h-36 h-24 w-24 object-cover rounded-lg"
          src={`${import.meta.env.VITE_API_BASE_URL}/fotoBengkel/${
            bengkel?.foto?.[0]?.foto
          }`}
          alt={bengkel?.nama_bengkel}
        />

        {/* Detail Service */}
        <div className="flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-medium text-neutral-400">{tipe}</span>
            <h1 className="text-lg font-semibold">{bengkel?.nama_bengkel}</h1>
            <p className="text-sm text-gray-500">Masalah : {deskripsi}</p>
          </div>
          <div className="md:mt-8 mt-2">
            <p className="text-sm flex gap-1 text-gray-500 items-center">
              <strong className="flex gap-1">
                {" "}
                <MapPin size={16} /> User:{" "}
              </strong>
              <a
                href={gmaps_link}
                className="text-blue-500 cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
              >
                Lokasi User
              </a>
            </p>
            <p className="text-sm flex gap-1 text-gray-500 items-center">
              <strong className="flex gap-1">
                {" "}
                <MapPin size={16} /> Bengkel:{" "}
              </strong>
              <a
                href={bengkel?.gmaps_link}
                className="text-blue-500  cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
              >
                Lokasi Bengkel
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Status dan Pesan */}
      <div className="flex mt-4 md:mt-0 flex-col md:items-end">
        <span
          className={`px-4 py-2 rounded-md font-medium text-white ${
            status === "PENDING"
              ? "bg-orange-500"
              : status === "APPROVED"
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        >
          {status === "PENDING" && "Menunggu Konfirmasi"}
          {status === "APPROVED" && "Disetujui"}
          {status === "REJECTED" && "Ditolak"}
        </span>
        <p className="mt-2 text-sm text-gray-500">
          {service?.pesan_bengkel || "Belum ada pesan dari bengkel"}
        </p>
      </div>
    </div>
  );
}
