const CardRincian = ({ item, onRemove, onQuantityChange }) => {
  const totalHarga = item.total_harga ? item.total_harga.toLocaleString() : "0";
  const harga = item.harga ? item.harga.toLocaleString() : "0";

  return (
    <div className="flex justify-between items-center p-4 border-b">
      {/* Bagian gambar produk */}
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
        <div className="flex items-center mt-2">
          <p className="text-sm font-semibold mr-2">Kuantitas</p>
          <button
            onClick={() =>
              onQuantityChange(item.id, Math.max(item.jumlah - 1, 1))
            }
            className="px-2 border border-gray-300 rounded-l-md"
          >
            -
          </button>
          <input
            type="number"
            value={item.jumlah}
            onChange={(e) => onQuantityChange(item.id, e.target.value)}
            className="w-12 text-center border-t border-b border-gray-300"
          />
          <button
            onClick={() => onQuantityChange(item.id, item.jumlah + 1)}
            className="px-2 border border-gray-300 rounded-r-md"
          >
            +
          </button>
        </div>
      </div>

      {/* Bagian harga dan tombol hapus */}
      <div className="ml-auto text-right">
        <p className="text-lg font-semibold">Rp{totalHarga}</p>
        <button onClick={() => onRemove(item.id)} className="text-red-500 mt-2">
          Hapus
        </button>
      </div>
    </div>
  );
};

export default CardRincian;
