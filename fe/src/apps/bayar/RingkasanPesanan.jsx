import React from "react";

const RingkasanPesanan = ({ ringkasan }) => {
  return (
    <div className="bg-white ">
      <h2 className="text-xl font-normal mb-6 ">Ringkasan Pesanan</h2>
      <p className="text-gray-500 mb-4">{ringkasan.total_produk} Produk</p>

      <div className="space-y-2 border-t border-b py-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Total Produk</span>
          <span>Rp{ringkasan.total_harga.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Pengiriman</span>
          <span>Rp{ringkasan.biaya_pengiriman.toLocaleString()}</span>
        </div>
      </div>

      <div className="flex justify-between mt-4 font-bold">
        <span>Total</span>
        <span>Rp{ringkasan.total.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default RingkasanPesanan;
