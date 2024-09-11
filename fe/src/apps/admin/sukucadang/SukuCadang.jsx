import Button from "../../../components/ui/Button";
import Layout from "../../../components/admin/layout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ModalDelete from "../../../components/admin/modals/modalDelete";
import Tables from "../../../components/ui/Table";
import Loading from "../../../components/ui/Loading";
import { showToast } from "../../../components/ui/Toaster";
import { Toaster } from "react-hot-toast";
import api from "../../../utils/axios";

export default function SukuCadang() {
  const navigate = useNavigate();
  const [sukuCadang, setSukuCadang] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state for fetching data
  const [isDeleting, setIsDeleting] = useState(false); // Loading state for deleting data
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const columns = [
    { header: "Nama Suku Cadang", accessor: "nama" },
    { header: "Harga", accessor: "harga" },
    { header: "Stok", accessor: "stok" },
  ];

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { data: data } = await api.get("/getAllSukuCadang");
      setSukuCadang(data.data);
    } catch (error) {
      showToast("error fetch data", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (row) => {
    navigate(`/manajemenSukuCadang/editSukuCadang/${row.id}`);
  };

  const handleView = (row) => {
    navigate(`/manajemenSukuCadang/${row.id}/transaksiSukuCadang`);
  };

  const handleDelete = async () => {
    setIsDeleting(true); // Start loading during deletion
    try {
      await api.delete(`/admin/deleteSukuCadang/${deleteId}`);
      fetchData();
      setShowDeleteModal(false);
      showToast("Suku Cadang berhasil dihapus", "success");
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false); // Stop loading after deletion
    }
  };

  if (isLoading) return <Loading />;

  return (
    <Layout>
      <Toaster />
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-3xl">Suku Cadang</h1>
        <Button
          onClick={() => navigate("/manajemenSukuCadang/addSukuCadang")}
          variant="primary"
          custom="px-8 py-1.5"
        >
          Tambah Data
        </Button>
      </div>
      <section className="mt-8 relative">
        {isLoading ? (
          <div className="fixed inset-0  bg-opacity-50 bg-gray-800 flex justify-center items-center z-50">
            <Loading type="spin" color="#ffffff" />
          </div>
        ) : (
          <Tables
            columns={columns}
            data={sukuCadang}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={(row) => {
              setDeleteId(row.id);
              setShowDeleteModal(true);
            }}
          />
        )}
      </section>
      {showDeleteModal && (
        <ModalDelete
          onClose={() => setShowDeleteModal(false)}
          onDelete={handleDelete}
          isLoading={isDeleting} // Pass loading state to modal
        />
      )}
    </Layout>
  );
}
