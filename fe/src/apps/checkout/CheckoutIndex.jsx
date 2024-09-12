import Navbar from "../../components/navbar";
import FormCheckout from "./FormCheckout";
import RincianBiaya from "./RincianBiaya";
import api from "../../utils/axios";
import React, { useState, useEffect } from "react";
import { showToast } from "../../components/ui/Toaster";
import Loading from "../../components/ui/Loading";
import { useParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function CheckoutIndex() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Mengambil keranjang_id dari URL params
  const { keranjang_id } = useParams();

  // Mengambil query params dari URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const items_id = queryParams.get("items"); // Ini mengambil query "items=1,2,3"

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Split items_id dari query string menjadi array
        const selectedItemIds = items_id ? items_id.split(",") : [];

        // Fetch data untuk setiap item
        const promises = selectedItemIds.map((id) =>
          api.get(`/cartItem/${id}`)
        );
        const responses = await Promise.all(promises);
        const fetchedItems = responses.map((response) => response.data.data);

        setItems(fetchedItems);
        setIsLoading(false);
      } catch (error) {
        showToast("Gagal memuat data", "error");
        setIsLoading(false);
      }
    };

    if (items_id) {
      fetchData();
    }
  }, [items_id]);

  const handleQuantityChange = (id, quantity) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, jumlah: Math.max(quantity, 1) } : item
      )
    );
  };

  const handleRemove = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleFormSubmit = async (formValues) => {
    try {
      const response = await api.post("/alamat", formValues);
      if (response.data.success) {
        showToast("Alamat berhasil disimpan!", "success");
        return response.data.data.id; // Return ID alamat
      } else {
        showToast("Gagal menyimpan alamat", "error");
        return null;
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        error.response.data.errors.forEach((errMsg) => showToast(errMsg, "error"));
      } else {
        showToast("Gagal menyimpan alamat", "error");
      }
      return null;
    }
  };

  const handleCheckout = async (formValues) => {
    setIsLoading(true);

    // Pertama, upload alamat
    const alamatId = await handleFormSubmit(formValues);

    // Jika alamat berhasil disimpan, lanjutkan ke proses pemesanan
    if (alamatId) {
      try {
        const post = await api.post("/pesan", {
          keranjang_id: keranjang_id,
          alamat_id: alamatId,
          suku_cadang: items,
        });
        showToast("Pesanan berhasil dibuat!", "success");
        navigate("/bayar/" + post.data.data.id);
        
      } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
          error.response.data.errors.forEach((errMsg) => showToast(errMsg, "error"));
        } else {
          showToast("Gagal membuat pesanan", "error");
        }
      }
    }

    setIsLoading(false);
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <Navbar />
      <section className="mx-12 mt-36">
        <h1 className="text-2xl font-semibold">Checkout</h1>
        <section className="grid items-start grid-cols-2 gap-8">
          <FormCheckout onSubmit={handleCheckout} />
          <RincianBiaya
            items={items}
            handleQuantityChange={handleQuantityChange}
            handleRemove={handleRemove}
          />
        </section>
      </section>
    </div>
  );
}
