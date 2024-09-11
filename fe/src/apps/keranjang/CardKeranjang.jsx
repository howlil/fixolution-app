import React from 'react';

export default function CardKeranjang({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <div className="flex justify-between items-center pb-4 mb-4">
      {/* Gambar */}
      <img 
        src={`${import.meta.env.VITE_API_BASE_URL}/fotoSukuCadang/${item.sukucadang.foto}`} 
        alt={item.sukucadang.nama} 
        className="w-28 h-28 object-cover"
      />

      {/* Informasi Produk */}
      <div className="flex-1 mx-4">
        <span className="text-gray-500 text-sm">{item.sukucadang.merek.nama_merek}</span>
        <h3 className="text-md font-semibold">{item.sukucadang.nama}</h3>
        <div className="flex items-center mt-2">
          <span>Kuantitas:</span>
          <div className="flex items-center border mx-2">
            <button 
              onClick={onDecrease} 
              className="px-3 py-1"
            >
              −
            </button>
            <input 
              type="text" 
              value={item.jumlah} 
              readOnly 
              className="w-12 text-center"
            />
            <button 
              onClick={onIncrease} 
              className="px-3 py-1"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Harga dan Hapus */}
      <div className="flex flex-col items-end">
        <span className="text-lg font-semibold">Rp.{item.total_harga.toLocaleString()}</span>
        <button 
          onClick={onRemove} 
          className="text-red-500 mt-2"
        >
          Hapus
        </button>
      </div>
    </div>
  );
}
