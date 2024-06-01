import Button from "../../components/ui/Button"
import Layout from "../../components/admin/layout"


export default function SukuCadang() {
  return (
    <Layout>
        <div className="flex justify-between items-center">
        <h1 className="font-semibold text-3xl">Suku Cadang</h1>
        <Button variant="primary" custom="px-8 py-1.5">Tambah Data</Button>
        </div>
    </Layout>
  )
}
