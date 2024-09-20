import Layout from "../../../components/admin/layout";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TextArea from "../../../components/ui/TextArea";
import Select from "../../../components/ui/Select";
import ArrayImg from "../../../components/ui/ArrayImg";
import { Toaster } from "react-hot-toast";
import Loading from "../../../components/ui/Loading";
import { showToast } from "../../../components/ui/Toaster";
import api from "../../../utils/axios";

export default function ManageBengkel() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [nama_bengkel, setNama] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alamat, setAlamat] = useState("");
  const [no_hp, setNoHp] = useState("");
  const [gmaps_link, setGmapsLink] = useState("");
  const [status, setStatus] = useState("");
  const [foto, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBengkelData = async () => {
      if (id) {
        setIsEditing(true);
        setIsLoading(true);
        try {
          const response = await api.get(`/admin/getBengkelById/${id}`);
          const bengkel = response.data;
          setNama(bengkel.nama_bengkel);
          setUsername(bengkel.username);
          setPassword(bengkel.password);
          setAlamat(bengkel.alamat);
          setNoHp(bengkel.no_hp);
          setGmapsLink(bengkel.gmaps_link);
          setStatus(bengkel.status);
          setImages(bengkel.foto);
        } catch (error) {
          setErrorMessage(error.response.data.message);
          showToast(error.response.data.message, "error");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchBengkelData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("nama_bengkel", nama_bengkel);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("no_hp", no_hp);
    formData.append("alamat", alamat);
    formData.append("status", status);
    formData.append("gmaps_link", gmaps_link);

    console.log(foto.files);

    foto.forEach((file, index) => {
      formData.append(`foto`, file);
    });

    try {
      if (isEditing) {
        const res = await api.put(`/admin/editBengkel/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        showToast(res.data.message, "success");
        if (res.data.success) {
          navigate("/manajemenBengkel");
        }
      } else {
        const res = await api.post("/admin/addBengkel", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        showToast(res.data.message, "success");
        if (res.data.success) {
          navigate("/manajemenBengkel");
        }
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
      showToast(error.response.data.message, "error");  
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loading />;
  return (
    <Layout>
      <Toaster />
      <h1 className="font-semibold text-3xl">
        {isEditing ? "Edit" : "Tambah"} Bengkel
      </h1>
      <form onSubmit={handleSubmit}>
        <section
          className={`grid mt-12 grid-cols-2 gap-4 ${
            isLoading ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <section className="space-y-4">
            <Input
              label="Nama Bengkel"
              placeholder="Masukkan nama bengkel"
              type="text"
              value={nama_bengkel}
              onChange={(e) => setNama(e.target.value)}
              customClass="border-neutral-500"
              required
            />
            <Input
              label="Username"
              placeholder="Masukkan username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              customClass="border-neutral-500"
              required
            />
            <Input
              label="Password"
              placeholder="Masukkan password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              customClass="border-neutral-500"
              required={!isEditing}
            />
            <TextArea
              label="Alamat"
              placeholder="Masukkan alamat"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              customClass="border-neutral-500"
              required
            />
            <Input
              label="Nomor Telepon"
              placeholder="Masukkan nomor telepon"
              type="text"
              value={no_hp}
              onChange={(e) => setNoHp(e.target.value)}
              customClass="border-neutral-500"
              required
            />
          </section>
          <section className="space-y-4">
            <Input
              label="Maps (Jika Ada)"
              placeholder="Masukkan Link Google MAPS"
              type="text"
              value={gmaps_link}
              onChange={(e) => setGmapsLink(e.target.value)}
              customClass="border-neutral-500"
            />
            <ArrayImg
              label="foto  Bengkel"
              onSelectImages={(files) => setImages(files)}
              links={foto}
            />
            <Select
              label="Status Akun"
              options={[
                { value: "Aktif", label: "Aktif" },
                { value: "TidakAktif", label: "Tidak Aktif" },
              ]}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              customClass="border-neutral-500"
              required
            />
          </section>
        </section>
        <section className="w-full flex justify-end">
          <Button
            variant="primary"
            type="submit"
            custom="px-8 py-1.5 mt-8"
            disabled={isLoading}
          >
            {isEditing ? "Edit" : "Tambah"} Bengkel
          </Button>
        </section>
      </form>
    </Layout>
  );
}
