import React from "react";
import CardProduct from "./CardProduct";
import wa from "public/wa.svg";
import Button from "../../ui/Button";

const Produk = () => {
  const products = [
    {
      img: "public/s1.png",
      title: "Product Title 1",
      description: "Menyediakan layanan suku cadang untuk pemesanan Anda",
    },
    {
      img: "public/s2.png",
      title: "Product Title 2",
      description: "Menyediakan layanan suku cadang untuk pemesanan Anda",
    },
    {
      img: "public/s2.png",
      title: "Product Title 2",
      description: "Menyediakan layanan suku cadang untuk pemesanan Anda",
    },
    {
      img: "public/s2.png",
      title: "Product Title 2",
      description: "Menyediakan layanan suku cadang untuk pemesanan Anda2",
    },
  ];

  return (
    <>
      <section className="bg-neutral-900 p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20">
        <figure className="text-center text-white my-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-neutral-100">SHOP</h1>
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium">Our Products</h3>
        </figure>
        <CardProduct products={products} />
      </section>
      <section className="bg-white flex flex-col sm:flex-row justify-between px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-8 items-center">
        <h1 className="font-medium text-xl mb-4 sm:mb-0">Need More Information?</h1>
        <div className="flex items-center gap-4">
          <img src={wa} width={32} className="text-white bg-neutral-900 p-3 rounded-full w-12 h-12" alt="wa" />
          <Button custom="rounded-xl text-white py-1.5 px-8">Hubungi Sekarang</Button>
        </div>
      </section>
    </>
  );
};

export default Produk;