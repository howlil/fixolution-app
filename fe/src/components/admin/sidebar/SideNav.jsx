import ActiveRoute from "./ActiveRoute";
import { navDataAdmin, navDataBengkel } from "../../../data/data";
import { getUserData } from "../../../utils/getUserData";

export default function SidebarNav() {
  const userType = getUserData();


  let navData;
  if (userType.userType === "superadmin") {
    navData = navDataAdmin;
  } else if (userType.userType === "user") {
    navData = navDataUser;
  } else if (userType.userType === "bengkel") {
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
