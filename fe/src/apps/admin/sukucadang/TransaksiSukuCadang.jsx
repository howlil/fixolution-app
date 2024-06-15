import Layout from "../../../components/admin/layout";
import Select from "../../../components/ui/Select";
export default function TransaksiSukuCadang() {
  return (
    <Layout>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-3xl">Transaksi Suku Cadang</h1>
      </div>
      <section className="flex mt-6 justify-between">
        <h1>Nama Suku Cadang</h1>
        <div className="flex gap-5">
          <section className="flex gap-3 items-center">
            <h1>Filter</h1>
            <Select />
          </section>
          <section className="flex gap-3 items-center" >
            <h1>Bulan</h1>
            <Select />
          </section>
        </div>
      </section>
    </Layout>
  );
}
