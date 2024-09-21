import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import Layout from "../../../components/admin/layout";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TextArea from "../../../components/ui/TextArea";
import InputImg from "../../../components/ui/InputImg";
import api from "../../../utils/axios";
import { showToast } from "../../../components/ui/Toaster";
import { Toaster } from "react-hot-toast";
import Loading from "../../../components/ui/Loading";
import Select from "../../../components/ui/Select";

export default function ManageSukuCadang() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [harga, setHarga] = useState("");
  const [stok, setStok] = useState("");
  const [lebar, setLebar] = useState("");
  const [tinggi, setTinggi] = useState("");
  const [panjang, setPanjang] = useState("");
  const [berat, setBerat] = useState("");
  const [fileInput, setFileInput] = useState(null);
  const [linkImage, setLinkImage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [merekId,setMerekId] = useState("");
  const [merek, setMerek] = useState([]);

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      setIsLoading(true);
      const fetchSukuCadang = async () => {
        try {
          const { data: response } = await api.get(`getSukuCadangById/${id}`);
          if (response.success) {
            const {
              nama,
              deskripsi,
              harga,
              stok,
              foto,
              lebar,
              tinggi,
              panjang,
              berat,
            } = response.data;
            setNama(nama);
            setDeskripsi(deskripsi);
            setHarga(harga);
            setStok(stok);
            setLebar(lebar);
            setTinggi(tinggi);
            setPanjang(panjang);
            setBerat(berat);
            setLinkImage(foto);
          } else {
            showToast(response.message, "error");
          }
        } catch (error) {
          showToast(error, "error");
        } finally {
          setIsLoading(false);
        }
      };
      fetchSukuCadang();
    }
  }, [id]);

  useEffect(() => {
    const fetchMerek = async () => {
      try {
        const { data: response } = await api.get(`/getAllMerek`);
        if (response.success) {
          setMerek(response.data);
        } else {
          showToast(response.message, "error");
        }
      } catch (error) {
        showToast(error.message, "error"); // Use error.message for better error handling
      }
    };

    fetchMerek(); // Call the fetchMerek function here
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!fileInput && !isEditing) {
      showToast("Gambar suku cadang wajib diunggah", "error");
      return;
    }

    if (!nama || !harga || !stok || !lebar || !tinggi || !panjang || !berat || !merekId) {
      showToast("Please fill in all fields", "error");
      return;
    }
    setIsLoading(true);

    try {
      // Buat FormData untuk mengirim data dalam bentuk multipart/form-data
      const formData = new FormData();
      formData.append("nama", nama);
      formData.append("deskripsi", deskripsi);
      formData.append("harga", harga);
      formData.append("stok", stok);
      formData.append("lebar", lebar);
      formData.append("tinggi", tinggi);
      formData.append("panjang", panjang);
      formData.append("berat", berat);
      formData.append("merek_id", merekId);
      formData.append("foto", fileInput);

      let response;
      if (isEditing) {
        response = await api.put(`/admin/editSukuCadang/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        response = await api.post(`/admin/addSukuCadang`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

        navigate("/manajemenSukuCadang");
      
    } catch (error) {
      showToast(error.message || "Error occurred", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageSelect = (file) => {
    setFileInput(file);
    setLinkImage(URL.createObjectURL(file));
  };

  const handleMerekChange = (e) => {
    const selectedMerekId = e.target.value;
    setMerekId(selectedMerekId);
  };
  
  return (
    <Layout>
      <Toaster />
      <h1 className="font-semibold text-3xl">
        {isEditing ? "Edit" : "Tambah"} Suku Cadang
      </h1>
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
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Lebar (cm)"
            customLabel="text-neutral-800 text-md"
            type="number"
            customClass="border-neutral-900 text-neutral-700"
            placeholder="Lebar"
            value={lebar}
            onChange={(e) => setLebar(e.target.value)}
          />
          <Input
            label="Tinggi (cm)"
            customLabel="text-neutral-800 text-md"
            type="number"
            customClass="border-neutral-900 text-neutral-700"
            placeholder="Tinggi"
            value={tinggi}
            onChange={(e) => setTinggi(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Panjang (cm)"
            customLabel="text-neutral-800 text-md"
            type="number"
            customClass="border-neutral-900 text-neutral-700"
            placeholder="Panjang"
            value={panjang}
            onChange={(e) => setPanjang(e.target.value)}
          />
          <Input
            label="Berat (kg)"
            customLabel="text-neutral-800 text-md"
            type="number"
            customClass="border-neutral-900 text-neutral-700"
            placeholder="Berat"
            value={berat}
            onChange={(e) => setBerat(e.target.value)}
          />
        </div>
        <Select
          label="Merek"
          options={merek.map((merk) => ({
            value: merk.id,
            label: merk.nama_merek,
          }))}
          onChange={(e) => handleMerekChange(e)} // handle perubahan jika diperlukan
        />

        <InputImg
          label="Gambar Suku Cadang"
          onSelectImage={handleImageSelect}
          linkImage={linkImage}
        />
        <div className="flex justify-end">
          <Button
            variant="primary"
            custom="px-8 mt-6 py-1.5"
            type="submit"
            disabled={isLoading}
          >
            {isEditing ? "Perbarui" : "Simpan"}
          </Button>
        </div>
      </form>
    </Layout>
  );
}
