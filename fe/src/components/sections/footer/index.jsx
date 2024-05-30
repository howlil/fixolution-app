import logo1 from "public/logo1.svg";

export default function Footer() {
  return (
    <footer className="p-16 bg-neutral-900 relative">
      <img src={logo1} className="w-64" alt="" />
      <section className="grid grid-cols-2 mt-12">
        <div>
          <h1 className="text-white text-2xl">Links</h1>
          {[
            {
              text: ">>Tutorial membuka website",
              link: "/",
            },
            {
              text: ">>Tutorial membuat menu",
              link: "/",
            },
            {
              text: ">>Bengkel terdekat",
              link: "/",
            },
          ].map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="block text-neutral-200 hover:text-neutral-100 mt-2"
            >
              {item.text}
            </a>
          ))}
        </div>
        <div className="flex flex-col items-end gap-y-4">
          <h1 className="text-white font-medium text-2xl">
            Get Our Newsletter
          </h1>
          <form className="flex flex-col gap-y-4 items-end">
            <input
              className="w-72 px-6 py-2 text-white bg-neutral-700 rounded-2xl"
              type="email"
              name="email"
              placeholder="your email"
            />
            <button 
            type="submit"
            className="px-8 py-1.5 bg-neutral-300 text-neutral-900 rounded-2xl "
            >
            send
            </button>
          </form>
        </div>
      </section>
    </footer>
  );
}
