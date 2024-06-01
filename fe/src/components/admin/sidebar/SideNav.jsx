import ActiveRoute from "./ActiveRoute";
import {jwtDecode} from "jwt-decode";
import { navDataAdmin } from "../../../data/data";

const getUserTypeFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded?.userType || null;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

export default function SidebarNav() {
  const userType = getUserTypeFromToken();

  let navData;
  if (userType === "superadmin") {
    navData = navDataAdmin;
  } else if (userType === "user") {
    navData = navDataUser;
  } else if (userType === "bengkel") {   
    navData = navDataBengkel;
  }

  return (
    <>
      {navData.map((data, i) => (
        <section key={i}>
          <ActiveRoute href={data.href} icon={data.icon} label={data.label} />
        </section>
      ))}
    </>
  );
}