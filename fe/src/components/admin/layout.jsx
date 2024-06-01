import SidebarIndex from "./sidebar"

export default function Layout({children}) {
  return (
    <section>
        <aside className="bg-base h-full w-[280px] fixed ">
            <SidebarIndex />
        </aside>
        <main className="ml-[280px] relative p-20  ">
            {children}
        </main>
    </section>
  )
}
