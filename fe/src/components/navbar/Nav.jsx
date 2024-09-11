import { navData } from "../../data/data";
import Button from "../ui/Button";
import { User, ShoppingCart, ShoppingBasket, UserRound } from "lucide-react";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../../utils/getUserData";
import { useState } from "react";

export default function Navbar() {
  const data = getUserData();
  const navigate = useNavigate();
  const [showPopUpMenu, showPopUpMenuHandler] = useState(false);

  return (
    <section className="flex items-center gap-6">
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
      {data && (
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
