import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Icon from "../../ui/Icon";
import { useActiveRoute } from "../../../utils/ActiveRouteContext";

export default function ActiveRoute({ href, icon, label }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { setActiveRoute } = useActiveRoute();

  const isActive = location.pathname === href || location.pathname.startsWith(`${href}/`);

  useEffect(() => {
    if (isActive) {
      setActiveRoute({ icon, label, href });
    }
  }, [isActive, icon, href, label, setActiveRoute]);

  const onClick = (e) => {
    e.preventDefault();
    navigate(href);
  };
  const activeClass = isActive ? "bg-second rounded-xl " : "";

  return (
    <>
      <section
        className={`${activeClass} py-3 mx-4 px-8 rounded-xl hover:bg-second ts flex gap-x-2`}
        onClick={onClick}
      >
        <Icon name={icon} size={24} color="white" />
        <Link className="font-normal text-md text-white" to={href}>
          {label}
        </Link>
      </section>
    </>
  );
}