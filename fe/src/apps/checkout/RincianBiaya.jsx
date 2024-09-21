import CardRincian from "./CardRincian";

export default function RincianBiaya({
  items,
  handleQuantityChange,
  handleRemove,
}) {
  // Menghitung total harga semua produk
  const totalHargaProduk = items.reduce(
    (acc, item) => acc + item.total_harga,
    0
  );

  const totalJumlahProduk = items.reduce((acc, item) => acc + item.jumlah, 0);

  return (
    <div className="bg-white p-4 shadow-lg rounded-md">
      <h2 className="text-lg font-semibold">
        Detail Pesanan ({items.length} Produk)
      </h2>
      <div>
        {items.map((item) => (
          <CardRincian
            key={item.id}
            item={item}
            onRemove={handleRemove}
            onQuantityChange={handleQuantityChange}
          />
        ))}
      </div>
      <div className="mt-4 pt-4">
        <p className="text-sm font-semibold">
          Total Produk: {totalJumlahProduk.toLocaleString()}
        </p>
        <h2 className="text-lg font-semibold mt-2">
          Total: Rp{totalHargaProduk.toLocaleString()}
        </h2>
      </div>
    </div>
  );
}
