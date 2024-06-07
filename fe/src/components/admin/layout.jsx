import SidebarIndex from "./sidebar"

export default function Layout({children}) {
  return (
    <section>
        <aside className="bg-base h-full w-[300px] fixed ">
            <SidebarIndex />
        </aside>
        <main className="ml-[300px] relative p-16  ">
            {children}
        </main>
    </section>
  )
}
