import { Menu, X } from "lucide-react";
import SidebarIndex from "./sidebar";
import { useState } from "react";

export default function SideBarMobile() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="px-6 py-4">
      <Menu onClick={() => setIsOpen(!isOpen)} size="24" />
      <aside
        className={`bg-base fixed top-0 left-0 h-full z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <X className="text-white absolute right-2 top-2" onClick={() => setIsOpen(!isOpen)} />
        <div className="mt-4">
          <SidebarIndex />
        </div>
      </aside>
    </div>
  );
}
