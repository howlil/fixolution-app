import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./apps/LandingPage";
import Dasboard from "./apps/admin/Dasboard";
import { ProtectRoute, withRole } from "./utils/ProtectRoute";
import Auth from "./apps/auth";
import { ActiveRouteProvider } from "./utils/ActiveRouteContext";
import SukuCadang from "./apps/admin/sukucadang/SukuCadang";
import ManajemenBengkel from "./apps/admin/bengkel/Bengkel";
import ManageBengkel from "./apps/admin/bengkel/ManageBengkel";
import PesanSukuCadang from "./apps/admin/sukucadang/PesanSukuCadang";
import TransaksiBengkel from "./apps/admin/bengkel/TransaksiBengkel";
import ServiceToGo from "./apps/admin/servicetogo/ServiceToGo";
import ManageSukuCadang from "./apps/admin/sukucadang/ManageSukuCadang";
import LayananBengkel from "./apps/admin/layananBengkel/LayananBengkel";
import KelolaLayananBengkel from "./apps/admin/layananBengkel/KelolaLayananBengkel";
import TransaksiSukuCadang from "./apps/admin/sukucadang/TransaksiSukuCadang";
import DetailProduct from "./components/sections/product/DetailProduct";
import BookingBengkel from "./apps/booking/BookingBengkel";
import DetailBookingBengkel from "./apps/booking/DetailBookingBengkel";
import PesananPage from "./apps/pesanan/PesananPage";
import ServiceToGoPage from "./apps/servicetogo/ServiceToGoPage";
import DetailStg from "./apps/servicetogo/DetailStg";
import SukuCadangPage from "./apps/transaksi/SukuCadangPage";
import { CartProvider } from "./apps/transaksi/CartContex";
import CheckoutIndex from "./apps/checkout/CheckoutIndex";
import KeranjangPage from "./apps/keranjang/KeranjangPage";
import BayarIndex from "./apps/bayar/BayarIndex";

const ProtectedDasboard = withRole(Dasboard, ["superadmin"]);
const ProtectedManajemenBengkel = withRole(ManajemenBengkel, ["superadmin"]);
const ProtectedSukuCadang = withRole(SukuCadang, ["superadmin"]);
const ProtectedManageSukuCadang = withRole(ManageSukuCadang, ["superadmin"]);
const ProtectedManageBengkel = withRole(ManageBengkel, ["superadmin"]);
const ProtectedPesanSukuCadang = withRole(PesanSukuCadang, ["superadmin"]);
const ProtectedServiceToGo = withRole(ServiceToGo, ["superadmin"]);
const ProtectedTransaksiBengkel = withRole(TransaksiBengkel, ["superadmin"]);
const ProtectedTransaksiSukuCadang = withRole(TransaksiSukuCadang, [
  "superadmin",
]);
const ProtectedLayananBengkel = withRole(LayananBengkel, ["superadmin"]);
const ProtectedKelolaLayananBengkel = withRole(KelolaLayananBengkel, [
  "superadmin",
]);

export default function App() {
  return (
    <Router>
      <ActiveRouteProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/daftar" element={<Auth />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/detailSukuCadang/:id" element={<DetailProduct />} />
            <Route path="/booking-bengkel" element={<BookingBengkel />} />
            <Route
              path="/booking-bengkel/:id"
              element={<DetailBookingBengkel />}
            />
            <Route path="/pesanan/berlangsung" element={<PesananPage />} />
            <Route path="/pesanan/selesai" element={<PesananPage />} />
            <Route path="/service" element={<ServiceToGoPage />} />
            <Route path="/service/:id" element={<DetailStg />} />
            <Route path="/suku-cadang" element={<SukuCadangPage />} />
            
            <Route
              path="/keranjang"
              element={
                <ProtectRoute>
                  <KeranjangPage />
                </ProtectRoute>
              }
            />
            <Route
              path="/checkout/:keranjang_id"
              element={
                <ProtectRoute>
                  <CheckoutIndex />
                </ProtectRoute>
              } 
            />
            <Route
              path="/bayar/:id_pesanan"
              element={
                <ProtectRoute>
                  <BayarIndex />
                </ProtectRoute>
              } 
            />

            <Route
              path="/dashboard"
              element={
                <ProtectRoute>
                  <ProtectedDasboard />
                </ProtectRoute>
              }
            />

            {/* BENGKEL */}
            <Route
              path="/manajemenBengkel"
              element={
                <ProtectRoute>
                  <ProtectedManajemenBengkel />
                </ProtectRoute>
              }
            />
            <Route
              path="/manajemenBengkel/:id/layananBengkel"
              element={
                <ProtectRoute>
                  <ProtectedLayananBengkel />
                </ProtectRoute>
              }
            />
            <Route
              path="/manajemenBengkel/:id/layananBengkel/addLayananBengkel"
              element={
                <ProtectRoute>
                  <ProtectedKelolaLayananBengkel />
                </ProtectRoute>
              }
            />
            <Route
              path="/manajemenBengkel/:id/layananBengkel/editLayananBengkel/:layanan_id"
              element={
                <ProtectRoute>
                  <ProtectedKelolaLayananBengkel />
                </ProtectRoute>
              }
            />
            <Route
              path="/manajemenBengkel/editBengkel/:id"
              element={
                <ProtectRoute>
                  <ProtectedManageBengkel />
                </ProtectRoute>
              }
            />
            <Route
              path="/manajemenBengkel/addBengkel"
              element={
                <ProtectRoute>
                  <ProtectedManageBengkel />
                </ProtectRoute>
              }
            />

            <Route
              path="/transaksiBengkel"
              element={
                <ProtectRoute>
                  <ProtectedTransaksiBengkel />
                </ProtectRoute>
              }
            />
            {/* SUKU CADANG */}

            <Route
              path="/manajemenSukuCadang"
              element={
                <ProtectRoute>
                  <ProtectedSukuCadang />
                </ProtectRoute>
              }
            />
            <Route
              path="/manajemenSukuCadang/:id/transaksiSukuCadang"
              element={
                <ProtectRoute>
                  <ProtectedTransaksiSukuCadang />
                </ProtectRoute>
              }
            />
            <Route
              path="/manajemenSukuCadang/addSukuCadang"
              element={
                <ProtectRoute>
                  <ProtectedManageSukuCadang />
                </ProtectRoute>
              }
            />
            <Route
              path="/manajemenSukuCadang/editSukuCadang/:id"
              element={
                <ProtectRoute>
                  <ProtectedManageSukuCadang />
                </ProtectRoute>
              }
            />
            <Route
              path="/pesanSukuCadang"
              element={
                <ProtectRoute>
                  <ProtectedPesanSukuCadang />
                </ProtectRoute>
              }
            />

            {/* SERVICE TO GO */}
            <Route
              path="/serviceToGo"
              element={
                <ProtectRoute>
                  <ProtectedServiceToGo />
                </ProtectRoute>
              }
            />
          </Routes>
        </CartProvider>
      </ActiveRouteProvider>
    </Router>
  );
}
