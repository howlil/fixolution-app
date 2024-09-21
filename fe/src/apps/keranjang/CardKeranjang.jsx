import React from "react";
import { Trash } from "lucide-react";

export default function CardKeranjang({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  return (
    <div className="flex justify-between items-start pb-4 mb-4">
      {/* Gambar */}
      <img
        src={`${import.meta.env.VITE_API_BASE_URL}/fotoSukuCadang/${
          item.sukucadang.foto
        }`}
        alt={item.sukucadang.nama}
        className="md:h-28 md:w-28 h-24 w-24 object-cover"
      />

      <div className="flex-1  w-full mx-4">
        <span className="text-gray-500 text-sm">
          {item.sukucadang.merek.nama_merek}
        </span>
        <h3 className="text-md font-semibold">{item.sukucadang.nama}</h3>
        <div className="flex w-full  justify-between  mt-2">
          <span className="text-lg md:hidden block font-semibold">
            Rp.{item.total_harga.toLocaleString()}
          </span>
          <div className="flex items-center border mx-2">
            <button onClick={onDecrease} className="md:px-3 px-2 py-1">
              −
            </button>
            <input
              type="text"
              value={item.jumlah}
              readOnly
              className="md:w-12 w-6 text-center"
            />
            <button onClick={onIncrease} className="md:px-3 px-2 py-1">
              +
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <span className="hidden md:block text-lg font-semibold">
          Rp.{item.total_harga.toLocaleString()}
        </span>
        <button onClick={onRemove} className="text-red-500 cursor-pointer mt-2">
          <Trash size={24} />
        </button>
      </div>
    </div>
  );
}
