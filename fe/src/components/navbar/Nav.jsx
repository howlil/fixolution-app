import { navData } from "../../data/data";
import Button from "../ui/Button";
import { User, ShoppingCart, ShoppingBasket, UserRound } from "lucide-react";
import { Link } from "react-scroll";
import { useNavigate, useLocation } from "react-router-dom";
import { getUserData } from "../../utils/getUserData";
import { useState } from "react";

export default function Navbar() {
  const data = getUserData();
  const navigate = useNavigate();
  const [showPopUpMenu, showPopUpMenuHandler] = useState(false);
  const isAdmin = data && data.userType === "superadmin";
  const isBengkel = data && data.userType === "bengkel";
  const isUser = data && data.userType === "user";
  const location = useLocation();
  const path = location.pathname;
  const home = path === "/";

  return (
    <section className="flex items-center gap-6">
      {home && (
        <ul className="flex gap-6 text-white text-lg">
          {navData.map((item, index) => (
            <li key={index}>
              <Link
                to={item.link}
                smooth={true}
                duration={500}
                className="cursor-pointer"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {data && (
        <>
          {isUser && (
            <>
              <button
                onClick={() => navigate("/keranjang")}
                className="cursor-pointer"
              >
                <ShoppingCart color="white" />
              </button>
              <button
                onClick={() => navigate("/pesanan/berlangsung")}
                className="cursor-pointer"
              >
                <ShoppingBasket color="white" />
              </button>
            </>
          )}
          <button
            onClick={() => showPopUpMenuHandler(true)}
            className="cursor-pointer"
          >
            <UserRound color="white" />
          </button>
        </>
      )}
      {showPopUpMenu && (
        <div className="absolute bg-white right-10 top-16 rounded-lg">
          {isAdmin ||
            (isBengkel && (
              <div
                className="px-4 py-2 cursor-pointer "
                onClick={() => {
                  showPopUpMenuHandler(false);
                  if (isAdmin) navigate("/dashboard");
                  if (isBengkel) navigate("/booking");
                }}
              >
                Beranda
              </div>
            ))}
          <div
            className="px-4 py-2 cursor-pointer "
            onClick={() => {
              showPopUpMenuHandler(false);
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            Logout
          </div>
        </div>
      )}

      {!data && (
        <Button
          onClick={() => navigate("/login")}
          custom="text-neutral-700 items-center ts bg-neutral-100 flex gap-1.5 px-6 py-1.5"
        >
          <User fill="grey" color="grey" size={16} />
          Login
        </Button>
      )}
    </section>
  );
}
