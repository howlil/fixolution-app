import Layout from "../../../components/admin/layout";
import Button from "../../../components/ui/Button";
import getBengkelById from "../../../apis/bengkel/getBengkelById";
import { useEffect,useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import Tables from "../../../components/ui/TableNoView";
import ModalDelete from "../../../components/admin/modals/modalDelete";
import deleteLayananBengkel from "../../../apis/bengkel/deleteLayananBengkel";

export default function LayananBengkel() {
  const [bengkel, setBengkel] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchData();
},[]);

const fetchData = async () => {
  const bengkelId = params.id;
    const data = await getBengkelById(bengkelId);
    setBengkel(data.data.namaBengkel);
}
const handleEdit = (row) => {
  navigate(`/manajemenBengkel/editBengkel/${row.id}`);
};
const handleDelete = async () => {
  try {
    const id = deleteId;
    await deleteLayananBengkel(params.id, id);
    setBengkel(bengkel.filter((item) => item.id !== deleteId));
    setShowDeleteModal(false);
  } catch (error) {
    console.error("Delete error:", error);}
};

const columns = [
  { header: "Nama Layanan", accessor: "namaLayanan" },
  { header: "Kisaran Harga", accessor: "harga" },
  { header: "jam Operational", accessor: "jamBuka" },
];
const navigateToAddLayananBengkel = () => {
  const currentId = params.id; 
  const newPath = `/manajemenBengkel/${currentId}/layananBengkel/addLayananBengkel`; 
  navigate(newPath); 
};


  return (
    <Layout>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-3xl">{`Layanan ${bengkel}`}</h1>
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
          onEdit={handleEdit}
          onDelete={(row) => {
            setDeleteId(row.id);
            setShowDeleteModal(true);
          }}        />
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
