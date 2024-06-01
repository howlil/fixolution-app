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
import ManajemenBengkel from "./apps/admin/Bengkel";
import SukuCadang from "./apps/admin/sukucadang/SukuCadang";
import AddSukuCadang from "./apps/admin/sukucadang/addSukuCadang";

const ProtectedDasboard = withRole(Dasboard, ['superadmin']);
const ProtectedManajemenBengkel = withRole(ManajemenBengkel, ['superadmin']);
const ProtectedSukuCadang = withRole(SukuCadang, ['superadmin']);
const ProtectedAddSukuCadang = withRole(AddSukuCadang, ['superadmin']);

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
                <ProtectedAddSukuCadang />
              </ProtectRoute>
            }
          />
        </Routes>
      </ActiveRouteProvider>
    </Router>
  );
}