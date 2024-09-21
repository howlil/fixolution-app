import { X } from "lucide-react";
import { useCart } from "./CartContex";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function ModalCartCheckout({ pesan, onclose }) {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const latestItem = cartItems[cartItems.length - 1];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <section className="p-6 bg-white rounded-xl w-[22rem] md:w-[34rem]">
        <div className="pb-4 border-b-2 flex justify-between">
          <p className="text-lg leading-5 font-semibold">{pesan}</p>
          <button onClick={onclose}>
            <X />
          </button>
        </div>

        <div className="mt-4 flex flex-col md:flex-row w-full justify-between md:items-center gap-2">
          <img
            className="w-40 h-40 object-cover rounded-md"
            src={`${import.meta.env.VITE_API_BASE_URL}/fotoSukuCadang/${
              latestItem?.foto
            }`}
            alt={latestItem?.nama}
          />
          <div>
            <div>
              <h2 className="text-lg font-semibold">{latestItem?.nama}</h2>
              <p className="text-sm text-gray-500">
                Jumlah: {latestItem?.quantity}
              </p>
              <p className="text-gray-500 text-md mt-4">
                Total: Rp. {latestItem?.total}
              </p>
            </div>
            <div className="mt-6 w-full  grid grid-cols-2 gap-4 justify-between">
              <Button
                variant={"outline"}
                custom="w-full px-4 text-sm py-1.5  rounded-lg ts"
                onClick={() => (window.location.href = "/keranjang")}
              >
                Lihat Keranjang
              </Button>
              <Button
                variant={"primary"}
                custom="w-full py-1.5  text-sm rounded-lg ts"
                onClick={() =>
                  navigate(
                    `/checkout/${latestItem?.keranjang_id}?items=${latestItem?.keranjang_item_id}`
                  )
                }
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
