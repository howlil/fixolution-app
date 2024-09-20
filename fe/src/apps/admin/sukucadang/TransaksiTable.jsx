import React from "react";

export default function TransaksiTable({ data, onValidate }) {
  return (
    <table className="w-full border-collapse">
      <thead className="bg-gray-200">
        <tr>
          <th className="border-b py-2 px-4 text-left">No</th>
          <th className="border-b py-2 px-4 text-left">Nama Pemesan</th>
          <th className="border-b py-2 px-4 text-left">Barang</th>
          <th className="border-b py-2 px-4 text-left">Hari/Tanggal</th>
          <th className="border-b py-2 px-4 text-left">Bukti Transaksi</th>
          <th className="border-b py-2 px-4 text-left">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} className="border-b">
            <td className="py-2 px-4 text-center">{index + 1}</td>
            <td className="py-2 px-4">{item.pemesan.nama}</td>
            <td className="py-2 px-4">{item.suku_cadang.nama}</td>
            <td className="py-2 px-4">{item.transaksi.tanggal_transaksi}</td>
            <td className="py-2 px-4">
              <a
                href={`${import.meta.env.VITE_API_BASE_URL}/payments/${item.transaksi.bukti_transaksi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
                download
              >
                {item.transaksi.bukti_transaksi.length > 20
                  ? `${item.transaksi.bukti_transaksi.slice(0, 20)}...`
                  : item.transaksi.bukti_transaksi}
              </a>
            </td>
            <td className="py-2 flex-1 flex-shrink-0 w-40 px-4 text-center">
              {item.konfirmasi === "MENUNGGU_KONFIRMASI" ? (
                <button
                  onClick={() => onValidate(item.transaksi.id_transaksi, "DITERIMA")}
                  className="bg-green-500 flex-1 flex-shrink-0 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  ✓ Validasi
                </button>
              ) : (
                <span className="text-green-500 border border-green-500 px-4 py-2 rounded-md">
                   Divalidasi
                </span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
