import Layout from "../../../components/admin/layout";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TextArea from "../../../components/ui/TextArea";
import Select from "../../../components/ui/Select";
import addBengkel from "../../../apis/bengkel/addBengkel";
import editBengkel from "../../../apis/bengkel/editBengkel";
import getBengkelById from "../../../apis/bengkel/getBengkelById"; 
import ArrayImg from "../../../components/ui/ArrayImg";
import { Toaster } from "react-hot-toast";
import Loading from "../../../components/ui/Loading";
import { showToast } from "../../../components/ui/Toaster";

export default function ManageBengkel() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [nama, setNama] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alamat, setAlamat] = useState("");
  const [noHp, setNoHp] = useState("");
  const [gmapsLink, setGmapsLink] = useState("");
  const [status, setStatus] = useState("");
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      setIsLoading(true);
      getBengkelById(id)
        .then((response) => {
          const bengkel = response.data;
          setNama(bengkel.namaBengkel);
          setUsername(bengkel.username);
          setPassword(bengkel.password); 
          setAlamat(bengkel.alamat);
          setNoHp(bengkel.noHp);
          setGmapsLink(bengkel.gmapsLink);
          setStatus(bengkel.status);
          setImages(bengkel.fotos || []); 
        })
        .catch((error) => {
          showToast("Failed to fetch bengkel data", "error");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 

    try {
      if (isEditing) {
       const res =  await editBengkel(id, {
          namaBengkel: nama,
          username,
          password,
          alamat,
          noHp,
          gmapsLink,
          status,
          fotos: images
        });
         showToast(res.message, "success");
         if(res.success){
          navigate("/manajemenBengkel");
         }
         
      } else {
       const res =  await addBengkel(nama, username, password, noHp, alamat, status, gmapsLink, images);
       showToast(res.message, "success");
       
       if(res.success){
        navigate("/manajemenBengkel");
       }
      }
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      showToast(errorMessage, "error");
    } finally {
      setIsLoading(false); 
    }
  };


  return (
    <Layout>
      <Toaster />
      <h1 className="font-semibold text-3xl">
        {isEditing ? "Edit" : "Tambah"} Bengkel
      </h1>
      <form onSubmit={handleSubmit}>
        {isLoading && (
          <div className="fixed h-full inset-0 flex items-center justify-center bg-opacity-50 bg-black z-50">
            <Loading type="spin" color="#ffffff" />
          </div>
        )}
        <section className={`grid mt-12 grid-cols-2 gap-4 ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
          <section className="space-y-4">
            <Input
              label="Nama Bengkel"
              placeholder="Masukkan nama bengkel"
              type="text"
              value={nama}
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
              value={noHp}
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
              value={gmapsLink}
              onChange={(e) => setGmapsLink(e.target.value)}
              customClass="border-neutral-500"
            />
            <ArrayImg
              label="Foto Bengkel"
              onSelectImages={(files) => setImages(files)}
              links={images}
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
          <Button variant="primary" type="submit" custom="px-8 py-1.5 mt-8" disabled={isLoading}>
            {isEditing ? "Edit" : "Tambah"} Bengkel
          </Button>
        </section>
      </form>
    </Layout>
  );
}
