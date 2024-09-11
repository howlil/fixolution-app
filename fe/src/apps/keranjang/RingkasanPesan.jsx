import React from 'react';
import Button from '../../components/ui/Button';
export default function RingkasanPesan({ totalProduk, subtotal,onCheckout }) {
  const totalHarga = subtotal; // No shipping cost is added.

  return (
    <div className="bg-white ">
      <h2 className="text-2xl font-semibold mb-4">Ringkasan Pesanan</h2>
      <div className="flex mt-12 justify-between mb-4 text-gray-700">
        <span>{totalProduk} Produk</span>
      </div>
      <div className="flex justify-between text-gray-700">
        <span>Subtotal</span>
        <span>Rp {subtotal.toLocaleString()}</span>
      </div>

      {/* Total */}
      <div className="flex justify-between mt-4 border-t pt-4 text-lg font-bold">
        <span>Total</span>
        <span>Rp {totalHarga.toLocaleString()}</span>
      </div>

      {/* Checkout Button */}
      <Button
      onClick={onCheckout}
      custom="w-full mt-6 py-2 text-white bg-primary-600 rounded-lg">
        Checkout ➔
      </Button>
    </div>
  );
}
