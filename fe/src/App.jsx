import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LandingPage from "./apps/LandingPage";
import Dasboard from "./apps/admin/Dasboard";
import { ProtectRoute } from "./utils/ProtectRoute";
import Auth from "./apps/auth";
import { ActiveRouteProvider } from "./utils/ActiveRouteContext";
import ManajemenBengkel from "./apps/admin/Bengkel";
import SukuCadang from "./apps/admin/SukuCadang";
export default function App() {
  return (
    <>
      <Router>
        <ActiveRouteProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/daftar" element={<Auth />} />
            <Route path="/login" element={<Auth />} />

            <Route path="/dashboard" element={<Dasboard />} />
            <Route path="/manajemenBengkel" element={<ManajemenBengkel />} />
            <Route path="/manajemenSukuCadang" element={<SukuCadang />} />
          </Routes>
        </ActiveRouteProvider>
      </Router>
    </>
  );
}
