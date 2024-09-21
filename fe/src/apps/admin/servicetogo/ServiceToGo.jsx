import Layout from "../../../components/admin/layout";
import api from "../../../utils/axios";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { showToast } from "../../../components/ui/Toaster";
import { Trash, Edit, Eye, Check, X } from "lucide-react";
import Loading from "../../../components/ui/Loading";

export default function ServiceToGo() {
  const [data, setData] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
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

  // Get current page data
  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get("/allRequest");
        setData(res.data.data); // Assuming `res.data.data` contains the service request array
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const openModal = (row, action) => {
    setSelectedService(row);
    setActionType(action);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedService(null);
    setWhatsappNumber("");
    setRejectionReason("");
  };

  const handleSubmit = async () => {
    if (actionType === "APPROVE" && !whatsappNumber) {
      showToast("error", "WhatsApp number is required for approval.");
      return;
    }
    if (actionType === "REJECT" && !rejectionReason) {
      showToast("Rejection reason is required.", "error");
      return;
    }

    try {
      const payload = {
        status: actionType === "APPROVE" ? "APPROVED" : "REJECTED",
        pesan_bengkel:
          actionType === "APPROVE" ? whatsappNumber : rejectionReason,
      };

      // Send the API request
      await api.put(`/respond/${selectedService.id}`, payload);

      setData((prevData) =>
        prevData.map((item) =>
          item.id === selectedService.id
            ? {
                ...item,
                status: actionType === "APPROVE" ? "APPROVED" : "REJECTED",
              }
            : item
        )
      );

      showToast("Service updated successfully", "success");
      closeModal();
    } catch (error) {
      console.error("Error updating service:", error);
      showToast("Failed to update service", "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

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
      <h1 className="text-xl md:text-3xl  font-semibold">
        Manage Selected Services
      </h1>
      {data.length > 0 ? (
        <>
          <section className="md:mt-12 mt-6 overflow-x-scroll">
            <table className="w-full table-auto">
              <thead className="bg-neutral-100 rounded-t-lg">
                <tr>
                  <th className="py-2 px-4 font-semibold text-center">No</th>
                  <th className="py-2 px-4 font-semibold text-start">Nama</th>
                  <th className="py-2 px-4 font-semibold text-start">
                    No. Handphone
                  </th>
                  <th className="py-2 px-4 font-semibold text-start">Alamat</th>
                  <th className="py-2 px-4 font-semibold text-start">
                    Masalah Kendaraan
                  </th>
                  <th className="py-2 px-4 font-semibold text-start">
                    No. Montir
                  </th>
                  <th className="py-2 px-4 font-semibold text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((row, rowIndex) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="text-center py-2 px-4">
                      {(currentPage - 1) * itemsPerPage + rowIndex + 1}
                    </td>
                    <td className="py-2 px-4 text-start">{row.user.nama}</td>
                    <td className="py-2 px-4 text-start">{row.user.no_hp}</td>
                    <td className="py-2 px-4 text-start">
                      <a
                        className="text-blue-400 underline"
                        href={row.gmaps_link}
                      >
                        {row.gmaps_link.slice(0, 20)}
                      </a>
                    </td>
                    <td className="py-2 px-4 text-start">
                      {row.deskripsi || "Masalah tidak tersedia"}
                    </td>
                    <td className="py-2 px-4 text-start">
                      {row.pesan_bengkel || "Belum ditentukan"}
                    </td>
                    <td className="py-2 px-4 flex justify-center space-x-2">
                      {row.status === "PENDING" ? (
                        <>
                          <button
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                            onClick={() => openModal(row, "REJECT")}
                          >
                            <X size={20} />
                          </button>
                          <button
                            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
                            onClick={() => openModal(row, "APPROVE")}
                          >
                            <Check size={20} />
                          </button>
                        </>
                      ) : row.status === "APPROVED" ? (
                        <span className="text-green-600">Dikonfirmasi</span>
                      ) : row.status === "REJECTED" ? (
                        <span className="text-red-600">Ditolak</span>
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
        <h2 className="text-center mt-6">Tidak ada data</h2>
      )}

      {/* Modal for Confirmation or Rejection */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg p-6 w-96"
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
