import React from "react";
import CardKeranjang from "./CardKeranjang";

export default function KeranjangItems({
  keranjang,
  onIncrease,
  onDecrease,
  onRemove,
  handleCheckboxChange
}) {
  if (keranjang.length === 0) {
    return <p className="text-gray-500 text-lg">Keranjang Anda kosong.</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Keranjang</h1>
      <div className="mt-12">
        {keranjang.map((item) => (
          <div key={item.id} className="flex gap-4 items-center justify-between">
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange(item.id)} // Checkbox untuk memilih item
              className="mb-6"
            />
            <div className="flex-1">
              <CardKeranjang
                item={item}
                onIncrease={() => onIncrease(item.id, item.jumlah)} // Kirim item ID dan jumlah
                onDecrease={() => onDecrease(item.id, item.jumlah)} // Kirim item ID dan jumlah
                onRemove={() => onRemove(item.id)} // Kirim item ID untuk hapus
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
