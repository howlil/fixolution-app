import Layout from "../../../components/admin/layout";
import api from "../../../utils/axios";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { showToast } from "../../../components/ui/Toaster";
import { Trash, Edit, Eye, Check, X } from "lucide-react";
import Loading from "../../../components/ui/Loading";

export default function ManageBooking() {
  const [data, setData] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState(""); // "APPROVE" or "REJECT"
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Get the current page data
  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get("/bookingsByBengkel");
        setData(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const openModal = (row, action) => {
    setSelectedBooking(row);
    setActionType(action);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
    setWhatsappNumber("");
    setRejectionReason("");
  };

  const handleSubmit = async () => {
    if (actionType === "APPROVE" && !whatsappNumber) return;
    if (actionType === "REJECT" && !rejectionReason) return;

    try {
      const payload = {
        status: actionType === "APPROVE" ? "APPROVED" : "REJECTED",
        pesan_bengkel:
          actionType === "APPROVE" ? whatsappNumber : rejectionReason,
      };

      await api.put(`/booking/respond/${selectedBooking.id}`, payload);

      setData((prevData) =>
        prevData.map((item) =>
          item.id === selectedBooking.id
            ? { ...item, status: payload.status }
            : item
        )
      );

      showToast("Booking updated successfully", "success");
      closeModal();
    } catch (error) {
      showToast("Failed to update booking", "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  const formatDate = (timestamp) => {
    if (timestamp) {
      const date = new Date(timestamp * 1000);
      return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
    return "Invalid Date";
  };

  const formatTime = (timestamp) => {
    if (timestamp) {
      const date = new Date(timestamp * 1000);
      return date.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return "Invalid Time";
  };

  // Pagination handlers
  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <Layout>
      <Toaster />
      <h1 className="text-xl md:text-3xl  font-semibold">Manage Booking</h1>
      {data.length > 0 ? (
        <>
          <section className="md:mt-12 mt-6 overflow-x-scroll">
            <table className="w-full">
              <thead className="bg-neutral-100 rounded-t-lg">
                <tr>
                  <th className="py-2 font-semibold text-center">No</th>
                  <th className="py-2 font-semibold text-start pl-4">Nama</th>
                  <th className="py-2 font-semibold text-start pl-4">No Hp</th>
                  <th className="py-2 font-semibold text-start pl-4">
                    Layanan
                  </th>
                  <th className="py-2 font-semibold text-start pl-4">
                    Tanggal
                  </th>
                  <th className="py-2 font-semibold text-start pl-4">Jam</th>
                  <th className="py-2 font-semibold text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((row, rowIndex) => (
                  <tr key={row.id} className="border-b border-neutral-300">
                    <td className="text-center py-2">
                      {(currentPage - 1) * itemsPerPage + rowIndex + 1}
                    </td>
                    <td className="py-2 text-start pl-4">{row.user.nama}</td>
                    <td className="py-2 text-start pl-4">{row.user.no_hp}</td>
                    <td className="py-2 text-start pl-4">
                      {row.layanan.nama_layanan}
                    </td>
                    <td className="py-2 text-start pl-4">
                      {formatDate(row.tanggal)}
                    </td>
                    <td className="py-2 text-start pl-4">
                      {formatTime(row.jam_mulai)}
                    </td>
                    <td className="py-2 flex justify-center space-x-2">
                      {row.status === "PENDING" ? (
                        <>
                          {/* Reject Button */}
                          <button
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                            onClick={() => openModal(row, "REJECT")}
                          >
                            <X size={20} />
                          </button>
                          {/* Confirm Button */}
                          <button
                            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
                            onClick={() => openModal(row, "APPROVE")}
                          >
                            <Check size={20} />
                          </button>
                        </>
                      ) : row.status === "APPROVED" ? (
                        <span className="text-green-600 border border-green-600 rounded p-1">
                          Dikonfirmasi
                        </span>
                      ) : row.status === "REJECTED" ? (
                        <span className="text-red-600 border border-red-600 rounded p-1">
                          Ditolak
                        </span>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <div className="flex justify-between items-center mt-12">
            <button
              className={`px-4 py-2 rounded-md ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "bg-base text-white"
              }`}
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              className={`px-4 py-2 rounded-md ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "bg-base text-white"
              }`}
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center mt-12">
          <p className="text-lg">Tidak ada data</p>
        </div>
      )}

      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg p-6 w-80 md:w-96"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            {actionType === "APPROVE" ? (
              <>
                <h2 className="text-xl font-semibold text-center mb-4">
                  Selesaikan Konfirmasi
                </h2>
                <p className="text-center mb-6">
                  Masukkan Nomor Whatsapp Montir Di bawah ini
                </p>
                <input
                  type="text"
                  className="w-full border rounded p-2 text-center mb-4"
                  placeholder="Masukkan nomor Whatsapp"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                />
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-center mb-4 text-red-500">
                  Alasan Menolak Pesanan
                </h2>
                <p className="text-center mb-6">
                  Masukkan alasan menolak pesanan di bawah ini
                </p>
                <textarea
                  className="w-full border rounded p-2 mb-4"
                  rows="4"
                  placeholder="Masukkan alasan"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                />
              </>
            )}
            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white w-full rounded py-2"
            >
              Selesai
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
