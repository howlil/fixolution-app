import React from "react";

export default function CardSC({ products, onClick }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-12">
      {products?.map((product) => (
        <div
          key={product.id}
          onClick={() => onClick(product.id)}
          className="bg-white hover:shadow-xl cursor-pointer rounded-md ts relative overflow-hidden"
        >
          <img
            src={`${import.meta.env.VITE_API_BASE_URL}/fotoSukuCadang/${
              product.foto
            }`}
            className="object-cover h-56 w-full"
            alt={product.nama}
          />
          <figcaption className="p-4 ">
            <span className="text-sm text-gray-400">
              {product.merek.nama_merek}
            </span>
            <h2 className="text-lg sm:text-xl font-semibold">{product.nama}</h2>
            <div className="mt-4 flex justify-between">
              <span className="text-md  text-primary">Rp. {product.harga}</span>
              <p className="space-x-2 text-gray-500">Stock :{product.stok}</p>
            </div>
          </figcaption>
        </div>
      ))}
    </section>
  );
}
