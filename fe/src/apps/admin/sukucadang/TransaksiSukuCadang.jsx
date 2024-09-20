import Layout from "../../../components/admin/layout";
import api from "../../../utils/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../components/ui/Loading";
import { Toaster } from "react-hot-toast";
import { showToast } from "../../../components/ui/Toaster";
import TransaksiTable from "./TransaksiTable";

export default function TransaksiSukuCadang() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams(); // Get ID from URL params
  const [bulan, setBulan] = useState(""); // Month filter state
  const [errorMessage, setErrorMessage] = useState(""); // Error message state

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const itemsPerPage = 10; // Number of items per page

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Get current items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Function to fetch data from API based on selected month
  const fetchData = async (selectedBulan) => {
    try {
      setLoading(true);
      setErrorMessage(""); // Clear previous errors before fetching data
      const url = selectedBulan
        ? `/transaksi/${id}?bulan=${selectedBulan}` // Append month filter to URL if selected
        : `/transaksi/${id}`; // Fetch all data if no month filter

      const { data: res } = await api.get(url);

      // Check if data is empty and show message, otherwise show data
      if (res.data && res.data.length > 0) {
        setData(res.data);
        setErrorMessage(""); // Clear any previous error messages
      } else {
        setErrorMessage("Tidak ada transaksi ditemukan untuk bulan ini.");
        setData([]); // Ensure table is cleared if no data is returned
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setData([]);
      setErrorMessage(error.response.data.message);
      showToast(error.response.data.message, "error"); // Show toast only if there's a real failure
    }
  };

  // Fetch data when the component is first rendered
  useEffect(() => {
    fetchData(); // Call without month filter on initial render
  }, [id]);

  // Handle month filter change
  const handleBulanChange = (e) => {
    const selectedBulan = e.target.value;
    setBulan(selectedBulan); // Set the selected month
    fetchData(selectedBulan); // Fetch data based on the selected month
  };

  // Validate transaction
  const handleValidate = async (transaksi_id, status) => {
    try {
      setLoading(true);
      await api.put(`/confirm`, {
        transaksi_id,
        status, // Send status to API
      });
      showToast("Transaksi berhasil divalidasi", "success");

      // Update the status in the local state
      setData((prevData) =>
        prevData.map((item) =>
          item.transaksi.id_transaksi === transaksi_id
            ? {
                ...item,
                konfirmasi: status,
                transaksi: { ...item.transaksi, status },
              }
            : item
        )
      );
    } catch (error) {
      setErrorMessage(error.response.data.message);
      showToast(error.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };

  // Pagination logic
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Render loading spinner if loading
  if (loading) return <Loading />;

  return (
    <Layout>
      <Toaster /> {/* Toaster for notifications */}
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-3xl">Transaksi Suku Cadang</h1>
      </div>
      <section className="flex mt-6 justify-between">
        {/* Show the name of the spare part */}
        <h1>{data[0]?.suku_cadang?.nama}</h1>
        <div className="flex gap-5">
          {/* Month filter input */}
          <section className="flex gap-3 items-center">
            <h1>Filter</h1>
            <input
              className="border px-4 py-1 rounded-xl"
              type="month"
              value={bulan}
              onChange={handleBulanChange} // Call fetchData when month changes
            />
          </section>
        </div>
      </section>
      <section className="mt-8">
        {/* If no data, show error message */}
        {errorMessage ? (
          <div className="flex justify-center items-center py-10">
            <h2 className="text-xl font-semibold text-gray-500">
              {errorMessage}
            </h2>
          </div>
        ) : (
          <>
            <TransaksiTable data={currentItems} onValidate={handleValidate} />
            {/* Pagination Controls */}
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
        )}
      </section>
    </Layout>
  );
}
