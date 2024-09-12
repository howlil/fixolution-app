import React from 'react';

const DetailPesanan = ({ detailPesanan }) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-normal mb-4 border-b pb-2">Detail Pesanan ({detailPesanan.length})</h2>
      {detailPesanan.map((item, index) => (
        <div key={index} className="flex justify-between items-start mb-6 pb-6 border-b last:border-b-0">
          <div className="flex items-start">
            <img src={`${import.meta.env.VITE_API_BASE_URL}/fotoSukuCadang/${item.foto}`} alt={item.nama} className="w-24 h-24 object-cover" />
            <div className="ml-4">
              <p className="font-semibold text-lg">{item.nama}</p>
              <p className="text-gray-600 mt-2">Kuantitas : {item.kuantitas}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold">Rp{item.harga.toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DetailPesanan;