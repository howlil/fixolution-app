import Navbar from "../../components/navbar";
import KeranjangItems from "./KeranjangItems";
import RingkasanPesan from "./RingkasanPesan";
import api from "../../utils/axios";
import { useEffect, useState } from "react";
import Loading from "../../components/ui/Loading";
import { showToast } from "../../components/ui/Toaster";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function KeranjangPage() {
  const [selectedIds, setSelectedIds] = useState([]); // Array untuk menyimpan ID item yang dipilih
  const [isLoading, setIsLoading] = useState(false);
  const [keranjang, setKeranjang] = useState([]);
  const [loadingItems, setLoadingItems] = useState({});
  const [keranjangPick, setKeranjangPick] = useState([]);
  const [keranjang_id, setKeranjangId] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { data: response } = await api.get("/cartItems");
      setKeranjang(response.data);
      setKeranjangId(response.data[0].keranjang_id);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Memanggil fungsi fetchData pada saat komponen di-mount
  }, []);

  // Memfilter item yang dipilih berdasarkan selectedIds
  useEffect(() => {
    if (selectedIds.length > 0) {
      const filtered = keranjang.filter((item) =>
        selectedIds.includes(item.id)
      );
      setKeranjangPick(filtered);
    } else {
      setKeranjangPick([]);
    }
  }, [selectedIds, keranjang]);

  // Menghitung subtotal harga semua barang yang dipilih
  const subtotal = keranjangPick.reduce(
    (acc, item) => acc + item.total_harga,
    0
  );

  // Menghitung total kuantitas produk yang dipilih
  const totalQuantity = keranjangPick.reduce(
    (total, product) => total + product.jumlah,
    0
  );

  // Fungsi untuk memperbarui item di keranjang
  const handleUpdate = async (id, jumlah, type) => {
    const newJumlah = type === "increase" ? jumlah + 1 : jumlah - 1;

    if (newJumlah < 1) {
      showToast("Jumlah barang tidak boleh kurang dari 1", "error");
      return;
    }

    setLoadingItems((prev) => ({ ...prev, [id]: true })); // Set loading untuk item tertentu

    try {
      const { data: response } = await api.put(`/editItem`, {
        item_id: id,
        jumlah: newJumlah,
      });

      if (response && response.success) {
        fetchData(); // Memperbarui data keranjang setelah berhasil
        showToast("Berhasil memperbarui keranjang", "success");
      } else {
        showToast(response.message || "Gagal memperbarui keranjang", "error");
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
      showToast(error.response.data.message, "error");
    } finally {
      setLoadingItems((prev) => ({ ...prev, [id]: false })); // Set loading false setelah selesai
    }
  };

  // Fungsi untuk menghapus item dari keranjang
  const handleRemove = async (id) => {
    setLoadingItems((prev) => ({ ...prev, [id]: true })); // Set loading untuk item yang dihapus

    try {
      const { data: response } = await api.delete(`/removeCart/`, {
        data: { item_id: id },
      });

      if (response.success) {
        fetchData(); // Memperbarui data keranjang setelah item dihapus
        showToast("Item berhasil dihapus dari keranjang", "success");
      } else {
        showToast(
          response.message || "Gagal menghapus item dari keranjang",
          "error"
        );
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
      showToast(error.response.data.message, "error");
    } finally {
      setLoadingItems((prev) => ({ ...prev, [id]: false })); // Set loading false setelah selesai
    }
  };

  // Fungsi untuk meng-handle perubahan checkbox
  const handleCheckboxChange = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((itemId) => itemId !== id)); // Hapus id dari array jika sudah ada
    } else {
      setSelectedIds([...selectedIds, id]); // Tambahkan id ke array
    }
  };

  const handleCheckout = () => {
    if (selectedIds.length > 0) {
      navigate(`/checkout/${keranjang_id}?items=${selectedIds.join(",")}`);

      showToast("Checkout berhasil!", "success");
    } else {
      showToast("Silakan pilih item terlebih dahulu.", "error");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <Navbar />
      <Toaster />
      <div className="md:mx-12 mx-4  grid md:grid-cols-3 mt-20 md:mt-36">
        <div className="md:col-span-2 md:h-full overflow-y-scroll h-96 pr-12">
          <KeranjangItems
            keranjang={keranjang}
            handleCheckboxChange={handleCheckboxChange} // Kirim fungsi handleCheckboxChange
            loadingItems={loadingItems} // Kirim loading state ke komponen item
            onDecrease={(id, jumlah) => handleUpdate(id, jumlah, "decrease")}
            onIncrease={(id, jumlah) => handleUpdate(id, jumlah, "increase")}
            onRemove={handleRemove}
          />
        </div>
        <div className="py-6 md:col-span-1">
          <RingkasanPesan
            onCheckout={handleCheckout}
            totalProduk={totalQuantity}
            subtotal={subtotal}
          />
        </div>
      </div>
    </div>
  );
}
