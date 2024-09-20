import { useLocation } from "react-router-dom";
import Daftar from "./Daftar";
import logos from "../../images/logos.svg";
import logo from "../../images/logo1.svg";
import img from "../../images/ban.png";
import Login from "./Login";

export default function Auth() {
  const location = useLocation();
  const daftar = location.pathname === "/daftar";
  const login = location.pathname === "/login";

  return (
    <section
      className={`relative h-screen bg-black bg-opacity-95 ${
        daftar
          ? "grid grid-cols-1 md:grid-cols-2"
          : "flex justify-center items-center"
      }`}
    >
      <img
        onClick={() => window.location.replace("/")}
        src={img}
        alt="s"
        className="absolute cursor-pointer -z-10 h-full w-full object-cover"
      />

      {daftar ? (
        <>
          <section className="p-8 hidden md:block md:p-16 lg:p-24 mt-24">
            <figure className="flex gap-2 items-center ">
              <img src={logos} className="w-16" alt="l" />
              <h1 className="text-2xl md:text-3xl lg:text-4xl text-white font-semibold">
                JOIN FOR FREE
              </h1>
            </figure>
            <h3 className="text-white leading-snug text-lg md:text-2xl lg:text-3xl">
              Solve Your Solution With Us
              <span className="text-col text-lg md:text-2xl lg:text-3xl px-2">
                inside YOU,
              </span>
              Enjoy your Journey
            </h3>
          </section>
          <section className="p-8 md:p-16 ">
            <h1 className="text-white font-semibold text-2xl md:text-4xl mb-6">
              Create <br /> new Account.
            </h1>
            <Daftar />
          </section>
        </>
      ) : login ? (
        <section className="space-y-6 w-full sm:w-1/3  ">
          <figure className="flex justify-center">
            <img 
            onClick={() => window.location.replace("/")}
            src={logo} className="w-64 cursor-pointer " alt="l" />
          </figure>
          <Login />
        </section>
      ) : null}
    </section>
  );
}
