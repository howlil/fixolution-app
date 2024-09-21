import { Trash } from "lucide-react";

const CardRincian = ({ item, onRemove, onQuantityChange }) => {
  const totalHarga = item.total_harga ? item.total_harga.toLocaleString() : "0";
  const harga = item.harga ? item.harga.toLocaleString() : "0";

  return (
    <div className="flex justify-between items-start p-2 md:p-4 border-b">
      <div className="flex-shrink-0">
        <img
          src={`${import.meta.env.VITE_API_BASE_URL}/fotoSukuCadang/${
            item.sukucadang.foto
          }`}
          alt={item.sukucadang.nama}
          className="w-24 h-24 object-cover rounded-md"
        />
      </div>

      {/* Bagian detail produk */}
      <div className="flex flex-col ml-4">
        <h3 className="text-md font-semibold">{item.sukucadang.nama}</h3>
        <p className="text-sm font-semibold">Harga: Rp{harga}</p>

        {/* Bagian jumlah (kuantitas) */}
        <div className="flex items-center mt-4">
          <button
            onClick={() =>
              onQuantityChange(item.id, Math.max(item.jumlah - 1, 1))
            }
            className="px-2 py-1 border border-gray-300 rounded-l-md"
          >
            -
          </button>
          <input
            type="number"
            value={item.jumlah}
            onChange={(e) => onQuantityChange(item.id, e.target.value)}
            className="md:w-12 w-8 px-1 py-1  border-t border-b border-gray-300"
          />
          <button
            onClick={() => onQuantityChange(item.id, item.jumlah + 1)}
            className="px-2 border py-1 border-gray-300 rounded-r-md"
          >
            +
          </button>
        </div>
      </div>

      {/* Bagian harga dan tombol hapus */}
      <div className="ml-auto text-right">
        <button onClick={() => onRemove(item.id)} className="text-red-500 mt-2">
          <Trash size={24} />
        </button>
      </div>
    </div>
  );
};

export default CardRincian;
