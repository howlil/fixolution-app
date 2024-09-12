import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../navbar/index";
import Button from "../../ui/Button";
import ModalCartCheckout from "../../../apps/transaksi/ModalCartCheckout";
import { useCart } from "../../../apps/transaksi/CartContex";
import api from "../../../utils/axios"; // Import Axios or any API utility
import Loading from "../../ui/Loading";
import { showToast } from "../../ui/Toaster";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function DetailProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { addToCart, isCartModalOpen, closeCartModal } = useCart(); 

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const { data: data } = await api.get(`/getSukuCadangById/${id}`);
      setProduct(data.data);
      setIsLoading(false);
    } catch (error) {
      showToast("Gagal memuat data", "error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = async () => {
    const cartItem = {
      suku_cadang_id: id, 
      jumlah: quantity,
    };

    try {
      // Call the backend API to add the product to the cart
      setIsLoading(true);
      const response = await api.post("/add-to-cart", cartItem);

      if (response.data.success) {
        const cartItemId = response.data.data.id;

        addToCart({
          keranjang_item_id: cartItemId,
          keranjang_id: response.data.data.keranjang_id,
          ...product,
          quantity,
          total: product.harga * quantity,
        }); // Update cart context

        showToast("Berhasil menambahkan ke keranjang", "success");
      } else {
        showToast("Gagal menambahkan ke keranjang", "error");
      }
      setIsLoading(false);
    } catch (error) {
      showToast("Gagal menambahkan ke keranjang", "error");
    }
  };

  if (isLoading) return <Loading />;
  return (
    <>
      <Navbar />
      <Toaster />
      {isCartModalOpen && (
        <ModalCartCheckout
          pesan="Berhasil Ditambahkan Ke Keranjang"
          onclose={closeCartModal}
        />
      )}
      <section className="mt-32 px-12 grid grid-cols-2 gap-12">
        <figure>
          <img
            src={`${import.meta.env.VITE_API_BASE_URL}/fotoSukuCadang/${
              product.foto
            }`}
            className="object-fit h-full w-full rounded-md"
            alt={product.nama}
          />
        </figure>
        <section className="py-12 space-y-6">
          <div className="mb-20 space-y-4">
            <h2 className="text-2xl font-semibold">{product.nama}</h2>
            <p className="text-gray-700 ">Rp {product.harga}</p>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <h3 className="text-md font-semibold">Kuantitas</h3>
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                className="px-4 py-1 text-lg"
                onClick={handleDecreaseQuantity}
              >
                −
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="w-12 text-center border-l border-r border-gray-300"
              />
              <button
                className="px-4 py-1 text-lg"
                onClick={handleIncreaseQuantity}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            custom="w-full py-2 rounded-md text-white 600"
          >
            Tambahkan Ke Keranjang
          </Button>

          {/* Product Specifications */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold">Spesifikasi</h3>
            <h1 className="mt-4 text-gray-700">{product.deskripsi}</h1>
            <ul className="list-disc ml-6 mt-2 text-gray-600">
              <li>Berat: {product.berat}kg</li>
              <li>Tinggi: {product.tinggi}cm</li>
              <li>Panjang: {product.panjang}cm</li>
              <li>Lebar: {product.lebar} cm</li>
            </ul>
          </div>
        </section>
      </section>
    </>
  );
}
