import Layout from "../../../components/admin/layout";
import Input from "../../../components/ui/Input";
import TextArea from "../../../components/ui/TextArea";
import Button from "../../../components/ui/Button";
export default function KelolaLayananBengkel() {
  return (
    <Layout>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-3xl">Tambah Layanan Bengkel</h1>
      </div>
      <section className="mt-12">
        <form className="space-y-4">
          <Input
            label="Nama Layanan"
            type="text"
            customClass="border-neutral-500"
            placeholder="Nama Layanan"
          />
          <Input
            label="Kisaran Harga"
            type="number"
            customClass="border-neutral-500"
            placeholder="Kisaran Harga"
          />
          <Input
            label="Jam Buka"
            type="time"
            customClass="border-neutral-500"
            placeholder="Jam Buka"
          />
          <Input
            label="Jam Tutup"
            type="time"
            customClass="border-neutral-500"
            placeholder="Jam Tutup"
          />
          <TextArea label="Deskripsi" placeholder="Deskripsi" />
          <div className="flex justify-end ">
            <Button variant="primary" custom="px-8 mt-6 py-1.5">
              Simpan Layanan
            </Button>
          </div>
        </form>
      </section>
    </Layout>
  );
}
