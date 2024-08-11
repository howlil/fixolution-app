import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import Layout from "../../../components/admin/layout";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TextArea from "../../../components/ui/TextArea";
import InputImg from "../../../components/ui/InputImg";
import addSukuCadang from "../../../apis/sukuCadang/addSukuCadang";
import editSukuCadang from "../../../apis/sukuCadang/editSukuCadang";
import getSukuCadangById from "../../../apis/sukuCadang/getSukuCadangById";
import { showToast } from "../../../components/ui/Toaster";
import { Toaster } from "react-hot-toast";
import Loading from "../../../components/ui/Loading";  // Import the loading component

export default function ManageSukuCadang() {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [harga, setHarga] = useState("");
  const [stok, setStok] = useState("");
  const [fileInput, setFileInput] = useState(null);
  const [linkImage, setLinkImage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);  // Loading state

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      setIsLoading(true);  // Start loading
      const fetchSukuCadang = async () => {
        try {
          const response = await getSukuCadangById(id);
          if (response.success) {
            const { nama, deskripsi, harga, stok, foto } = response.data;
            setNama(nama);
            setDeskripsi(deskripsi);
            setHarga(harga);
            setStok(stok);
            setLinkImage(foto); 
          } else {
            showToast(response.message, "error");
          }
        } catch (error) {
          showToast(error, "error");
        } finally {
          setIsLoading(false);  // Stop loading
        }
      };
      fetchSukuCadang();
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!fileInput && !isEditing) { 
      showToast("Gambar suku cadang wajib diunggah", "error");
      return; 
    }

    setIsLoading(true);  

    try {
      let response;
      if (isEditing) {
        response = await editSukuCadang(nama, deskripsi, harga, stok, fileInput, id);
        showToast(response.message, response.success ? "success" : "error");

      } else {
        response = await addSukuCadang(nama, deskripsi, harga, stok, fileInput);
        showToast(response.message, response.success ? "success" : "error");
      }

      if (response.success) {
        navigate("/manajemenSukuCadang");
      } else {
        showToast(response.message, "error");
      }
    } catch (error) {
      showToast(error, "error");
    } finally {
      setIsLoading(false);  
    }
  };

  const handleImageSelect = (file) => {
    setFileInput(file);
    setLinkImage(URL.createObjectURL(file)); 
  };

  return (
    <Layout>
      <Toaster />
      <h1 className="font-semibold text-3xl">{isEditing ? "Edit" : "Tambah"} Suku Cadang</h1>
      <form className="mt-8 space-y-4 relative" onSubmit={handleSubmit}>
        {isLoading && (
          <div className="fixed inset-0 bg-opacity-50 bg-gray-800 flex justify-center items-center z-50">
            <Loading type="spin" color="#ffffff" />
          </div>
        )}
        <Input
          label="Nama Suku Cadang"
          customLabel="text-neutral-800 text-md"
          type="text"
          customClass="border-neutral-900 text-neutral-700"
          placeholder="Suku Cadang"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />
        <Input
          label="Harga Suku Cadang"
          customLabel="text-neutral-800 text-md"
          type="number"
          customClass="border-neutral-900 text-neutral-700"
          placeholder="Harga"
          value={harga}
          onChange={(e) => setHarga(e.target.value)}
        />
        <TextArea
          name="deskripsi"
          label="Deskripsi"
          placeholder="Deskripsi"
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
        />
        <Input
          label="Stok"
          customLabel="text-neutral-800 text-md"
          type="number"
          customClass="border-neutral-900 text-neutral-700"
          placeholder="Stok"
          value={stok}
          onChange={(e) => setStok(e.target.value)}
        />
        <InputImg
          label="Gambar Suku Cadang"
          onSelectImage={handleImageSelect}
          linkImage={linkImage} 
        />
        <div className="flex justify-end">
          <Button variant="primary" custom="px-8 mt-6 py-1.5" type="submit" disabled={isLoading}>
            {isEditing ? "Perbarui" : "Simpan"}
          </Button>
        </div>
      </form>
    </Layout>
  );
}
