import Layout from "../../components/admin/layout"
import CardDashboard from "../../components/admin/card/CardDashboard"
export default function Dasboard() {
  return (
    <Layout>
        <section className="grid grid-cols-3 gap-3">
            <CardDashboard icon="Package" name="Suku Cadang" data="12" />
            <CardDashboard icon="Warehouse" name="Bengkel" data="12" />
            <CardDashboard icon="ScrollText" name="Suku Cadang" data="12" />
        </section>
    </Layout>
  )
}
