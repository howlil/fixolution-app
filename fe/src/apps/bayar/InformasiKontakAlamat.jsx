import React from "react";

const InformasiKontakAlamat = ({ data, alamat }) => {
  return (
    <div className="font-sans">
      <h2 className="text-xl font-normal bg-gray-100 px-6 py-2 rounded-md mb-4">
        1. Informasi Kontak & Alamat
      </h2>

      <div className="mb-6">
        <h3 className="font-bold mb-2">Kontak</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-400">Nama</p>
            <p className="font-normal text-sm">{data.nama}</p>
          </div>
          <div>
            <p className="text-gray-400">Nomor Handphone</p>
            <p className="font-normal text-sm">{data.nomor_hp}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-bold mb-2">Alamat</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-400">Provinsi</p>
            <p className="font-normal text-sm">{alamat.provinsi}</p>
          </div>
          <div>
            <p className="text-gray-400">Kota</p>
            <p className="font-normal text-sm">{alamat.kota}</p>
          </div>
          <div>
            <p className="text-gray-400">Kecamatan</p>
            <p className="font-normal text-sm">{alamat.kecamatan}</p>
          </div>
          <div>
            <p className="text-gray-400">Alamat Lengkap</p>
            <p className="font-normal break-words text-sm">
              {alamat.alamat_lengkap}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformasiKontakAlamat;
