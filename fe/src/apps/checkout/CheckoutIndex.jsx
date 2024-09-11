import Navbar from "../../components/navbar"
import FormCheckout from "./FormCheckout"
import RincianBiaya from "./RincianBiaya"
import api from '../../utils/axios';
import React, { useState, useEffect } from "react";
import { showToast } from '../../components/ui/Toaster';
import Loading from '../../components/ui/Loading';
import { useParams } from "react-router-dom";

export default function CheckoutIndex() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { items_id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const { data: cartData } = await api.get(`/cartItem/${items_id}`);
        setItems([cartData.data]);

        setIsLoading(false);
      } catch (error) {
        showToast("Gagal memuat data", "error");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [items_id]);

  const handleQuantityChange = (id, quantity) => {
    setItems(
      items.map(item =>
        item.id === id ? { ...item, jumlah: Math.max(quantity, 1) } : item
      )
    );
  };

  // Handle remove item
  const handleRemove = (id) => {
    setItems(items.filter(item => item.id !== id));
  };


  if (isLoading) return <Loading />;

  return (
    <div>
      <Navbar />
      <section className="mx-12 mt-36">
        <h1 className="text-2xl font-semibold">Checkout</h1>
        <section className="grid grid-cols-2 gap-8">
          {/* Pass all required data to child components */}
          <FormCheckout

          />
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
