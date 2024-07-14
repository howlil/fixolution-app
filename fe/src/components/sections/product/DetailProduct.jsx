import getSukuCadangById from "../../../apis/sukuCadang/getSukuCadangById";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../navbar/index"

export default function DetailProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getSukuCadangById(id);
      setProduct(data.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  return (
    <>
      <Navbar />
      <section className="mt-32 px-16 grid grid-cols-2">
      <figure className="p-12">
      <img
        src={`${import.meta.env.VITE_API_BASE_URL}/fotoSukuCadang/${
          product.foto
        }`}
        className="w-full"
        alt={product.nama}
      />
      </figure>
      <section className="py-12">
      <h2 className="text-3xl">Product Details</h2>
        <section className="mt-12">
        <h2 className="text-2xl"> {product.nama}</h2>
      <p className="text-neutral-700 py-4">{product.deskripsi}</p>
      <p>Rp {product.harga}</p>
        </section>
      </section>

      </section>
    </>
  );
}
