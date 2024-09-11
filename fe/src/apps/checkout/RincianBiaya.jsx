import CardRincian from './CardRincian';

export default function RincianBiaya({ items, handleQuantityChange, handleRemove }) {
  const totalHargaProduk = items.reduce((acc, item) => acc + item.total_harga, 0);
  const biayaPengiriman = 100000; // Dummy biaya pengiriman

  return (
    <div className="bg-white p-4 shadow-lg rounded-md">
      <h2 className="text-lg font-semibold">Detail Pesanan ({items.length} Produk)</h2>
      <div>
        {items.map(item => (
          <CardRincian
            key={item.id}
            item={item}
            onRemove={handleRemove}
            onQuantityChange={handleQuantityChange}
          />
        ))}
      </div>
      <div className="border-t mt-4 pt-4">
        <p className="text-sm font-semibold">Total Produk: Rp{totalHargaProduk.toLocaleString()}</p>
        <p className="text-sm">Pengiriman: Rp{biayaPengiriman.toLocaleString()}</p>
        <h2 className="text-lg font-semibold mt-2">Total: Rp{(totalHargaProduk + biayaPengiriman).toLocaleString()}</h2>
      </div>
    </div>
  );
}
