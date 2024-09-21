import SidebarIndex from "./sidebar"
import { useIsMobile } from "../../utils/utils"
import SideBarMobile from "./SideBarMobile";

export default function Layout({children}) {
  const isMobile = useIsMobile();
  return (
    <section>
        <aside className="bg-base hidden  md:block h-full md:w-[300px] md:fixed ">
            <SidebarIndex />
        </aside>
        {isMobile && <SideBarMobile />}
        <main className="md:ml-[300px] relative md:p-16 px-6  py-8 ">
            {children}
        </main>
    </section>
  )
}
