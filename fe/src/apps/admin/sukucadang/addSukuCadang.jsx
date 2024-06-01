import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import Layout from "../../../components/admin/layout";
import { useNavigate } from "react-router-dom";
import TextArea from "../../../components/ui/TextArea";
import InputImg from "../../../components/ui/InputImg";

export default function AddSukuCadang() {
  return (
    <Layout>
      <h1 className="font-semibold text-3xl">Tambah Suku Cadang</h1>
      <form className="mt-8 space-y-4">
        <Input
          label="Nama Suku Cadang"
          customLabel="text-neutral-800 text-md"
          type="text"
          customClass="border-neutral-900  text-neutral-700  "
          placeholder="Suku Cadang"
        />
        <Input
          label="Harga Suku Cadang"
          customLabel="text-neutral-800 text-md"
          type="number"
          customClass="border-neutral-900  text-neutral-700  "
          placeholder="Suku Cadang"
        />
        <TextArea name="deskripsi" label="Deskripsi" placeholder="Deskripsi" />
        <InputImg label="Gambar Suku Cadang" />

        <div className="flex justify-end ">
          <Button variant="primary" custom="px-8 mt-6 py-1.5">
            Simpan
          </Button>
        </div>
      </form>
    </Layout>
  );
}
