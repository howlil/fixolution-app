import React, { useState, useEffect } from "react";
import CardProduct from "./CardProduct";
import wa from "../../../images/wa.svg";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/axios";

const Produk = () => {
  const [sukuCadang, setSukuCadang] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await api.get("/getAllSukuCadang");
      setSukuCadang(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setSukuCadang([]); // Fallback to empty array if there's an error
    }
  };

  const handleClick = (id) => {
    navigate(`/detailSukuCadang/${id}`);
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  if (sukuCadang.length === 0) {
    return <div className="text-center text-white">Tidak Ada Barang</div>;
  }

  return (
    <>
      <section className="bg-neutral-900 p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20">
        <figure className="text-center text-white my-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-neutral-100">SHOP</h1>
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium">Our Products</h3>
        </figure>
        <CardProduct products={showAll ? sukuCadang : sukuCadang.slice(0, 4)} onClick={handleClick} />
        {sukuCadang.length > 4 && (
          <div className="text-center mt-8">
            <Button onClick={toggleShowAll} custom="bg-col text-white py-2 px-4 rounded">
              {showAll ? "Show Less" : "View More"}
            </Button>
          </div>
        )}
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
