import Layout from "../../../components/admin/layout";
import Button from "../../../components/ui/Button";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Tables from "../../../components/ui/TableNoView";
import ModalDelete from "../../../components/admin/modals/modalDelete";
import api from "../../../utils/axios";
import Loading from "../../../components/ui/Loading";
import { showToast } from "../../../components/ui/Toaster";
import { Toaster } from "react-hot-toast";

export default function LayananBengkel() {
  const [bengkel, setBengkel] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [nama_bengkel, setNamaBengkel] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const { data: response } = await api.get(`${id}/getAllLayananBengkel`);

      const updatedData = response.data.map((item) => ({
        ...item,
        jamOperational: `${item.jam_buka} - ${item.jam_tutup}`,
      }));

      setBengkel(updatedData);
      setNamaBengkel(updatedData[0]?.bengkel?.nama_bengkel || "");
    } catch (error) {
      showToast("Gagal mengambil data layanan", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (row) => {
    navigate(`/manajemenBengkel/${id}/layananBengkel/editLayananBengkel/${row.id}`);
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const { data: data } = await api.delete(`${id}/deleteLayananBengkel/${deleteId}`);
      setShowDeleteModal(false);
      showToast(data.message, "success");
      fetchData();
    } catch (error) {
      showToast("Layanan bengkel gagal dihapus", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { header: "Nama Layanan", accessor: "nama_layanan" },
    { header: "Kisaran Harga", accessor: "harga" },
    { header: "Jam Operational", accessor: "jamOperational" }, // Use the combined data
  ];

  const navigateToAddLayananBengkel = () => {
    const newPath = `/manajemenBengkel/${id}/layananBengkel/addLayananBengkel`;
    navigate(newPath);
  };

  if (isLoading) return <Loading />;

  return (
    <Layout>
      <Toaster />
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-3xl">{`Layanan ${nama_bengkel}`}</h1>
        <Button
          variant="primary"
          onClick={navigateToAddLayananBengkel}
          custom="px-8 py-1.5"
        >
          Tambah Layanan
        </Button>
      </div>
      <section className="mt-8">
        <Tables
          columns={columns}
          data={bengkel}
          onEdit={handleEdit}
          onDelete={(row) => {
            setDeleteId(row.id);
            setShowDeleteModal(true);
          }}
        />
      </section>
      {showDeleteModal && (
        <ModalDelete
          onDelete={handleDelete}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </Layout>
  );
}
