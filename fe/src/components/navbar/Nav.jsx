import { navData } from "../../data/data";
import Button from "../ui/Button";
import { User } from 'lucide-react';
import { Link } from 'react-scroll';
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
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
      <Button onClick={()=>navigate("/login")} custom="text-neutral-700 items-center ts bg-neutral-100 flex gap-1.5 px-6 py-1.5">
        <User fill="grey" color="grey" size={16} />
        Login
      </Button>
    </section>
  );
}
