
import { User } from "lucide-react";
import { navData } from "../../data/data";
import { Link } from "react-scroll";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";


export default function NavMobile({isOpen, setIsOpen}) {
   const navigate = useNavigate();
  const handleClickOutside = (event) => {
    if (event.target === event.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <div>
      <div className="fixed inset-0">
        {isOpen && (
          <section
            className="absolute z-50 inset-0  h-full flex items-start justify-center bg-white bg-opacity-70 backdrop-blur-[2px]"
            onClick={handleClickOutside}
          >
            <section className="bg-white shadow-sm w-full text-center border-neutral-100 backdrop-blur-sm m-8   bg-opacity-75 rounded-2xl p-8">
              <ul className="  text-black text-lg">
                {navData.map((item, index) => (
                  <li className="hover:bg-gray-200 ts w-full py-2 rounded-md" key={index}>
                    <Link
                      to={item.link}
                      smooth={true}
                      duration={500}
                      className="cursor-pointer"
                      onClick={() => setIsOpen(false)} 
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <Button onClick={()=>navigate("/login")} variant="primary" custom="text-neutral-700 my-4 items-center justify-center w-full items-center ts text-white flex gap-1.5 px-6 py-2">
                <User fill="white" color="white" size={16} />
                Login
              </Button>
            </section>
          </section>
        )}
      </div>
    </div>
  );
}
