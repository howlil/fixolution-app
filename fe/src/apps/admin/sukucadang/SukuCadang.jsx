import Button from "../../../components/ui/Button";
import Layout from "../../../components/admin/layout";
import { useNavigate } from "react-router-dom";
import getAllSukuCadang from "../../../apis/sukuCadang/getSukuCadang";
import { useEffect, useState } from "react";
import Tables from "../../../components/ui/Table";
import ModalDelete from "../../../components/modals/modalDelete";
import deleteSukuCadang from "../../../apis/sukuCadang/deleteSukuCadang";

export default function SukuCadang() {
  const navigate = useNavigate();
  const [sukuCadang, setSukuCadang] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);

  const columns = [
    { header: "Nama Suku Cadang", accessor: "nama" },
    { header: "Harga", accessor: "harga" },
    { header: "Stok", accessor: "stok" },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getAllSukuCadang();
    setSukuCadang(data.data);
    console.log(data.data);
  };
  const handleEdit = (row) => {
    setEditId(row.id);
    navigate(`/manajemenSukuCadang/editSukuCadang/${row.id}`);
  };

  const handleDelete = async () => {
    try {
      const id = deleteId;
      await deleteSukuCadang(id  );
      fetchData();
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };
  return (
    <Layout>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-3xl">Suku Cadang</h1>
        <Button
          onClick={() => navigate("/manajemenSukuCadang/AddSukuCadang")}
          variant="primary"
          custom="px-8 py-1.5"
        >
          Tambah Data
        </Button>
      </div>
      <section className="mt-8">
        <Tables
          columns={columns}
          data={sukuCadang}
          onEdit={handleEdit}
          onDelete={(row) => {
            setDeleteId(row.id);
            setShowDeleteModal(true);
          }}
        />
      </section>
      {showDeleteModal && (
        <ModalDelete
          onClose={() => setShowDeleteModal(false)}
          onDelete={handleDelete}
        />
      )}
    </Layout>
  );
}
