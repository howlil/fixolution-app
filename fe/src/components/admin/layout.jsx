import SidebarIndex from "./sidebar"

export default function Layout({children}) {
  return (
    <section>
        <aside className="bg-base h-full w-[280px] absolute ">
            <SidebarIndex />
        </aside>
        <main className="ml-[280px] pt-16 px-8 ">
            {children}
        </main>
    </section>
  )
}
