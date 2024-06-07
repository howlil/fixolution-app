import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
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

const ProtectedDasboard = withRole(Dasboard, ['superadmin']);
const ProtectedManajemenBengkel = withRole(ManajemenBengkel, ['superadmin']);
const ProtectedSukuCadang = withRole(SukuCadang, ['superadmin']);
const ProtectedManageSukuCadang = withRole(ManageSukuCadang, ['superadmin']);
const ProtectedManageBengkel = withRole(ManageBengkel, ['superadmin']);
const ProtectedPesanSukuCadang = withRole(PesanSukuCadang, ['superadmin']);
const ProtectedServiceToGo = withRole(ServiceToGo, ['superadmin']);
const ProtectedTransaksiBengkel = withRole(TransaksiBengkel, ['superadmin']);

export default function App() {
  return (
    <Router>
      <ActiveRouteProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/daftar" element={<Auth />} />
          <Route path="/login" element={<Auth />} />

          <Route
            path="/dashboard"
            element={
              <ProtectRoute>
                <ProtectedDasboard />
              </ProtectRoute>
            }
          />
          <Route
            path="/manajemenBengkel"
            element={
              <ProtectRoute>
                <ProtectedManajemenBengkel />
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
            path="/manajemenSukuCadang"
            element={
              <ProtectRoute>
                <ProtectedSukuCadang />
              </ProtectRoute>
            }
          />
          <Route
            path="/manajemenSukuCadang/AddSukuCadang"
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
          <Route
            path="/serviceToGo"
            element={
              <ProtectRoute>
                <ProtectedServiceToGo />
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
        </Routes>
      </ActiveRouteProvider>
    </Router>
  );
}