
const CardProduct = ({ products, onClick }) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-12">
      {products?.map((product) => (
        <div key={product.id} onClick={() => onClick(product.id)} className="bg-white cursor-pointer rounded-xl ts relative overflow-hidden">
          <img
            src={`${import.meta.env.VITE_API_BASE_URL}/fotoSukuCadang/${product.foto}`}
            className="object-cover w-full"
            alt={product.nama}
          />
          <figcaption className="p-5 text-center">
            <h2 className="text-lg sm:text-xl font-semibold">{product.nama}</h2>
            <p className="text-sm sm:text-md">
              {product.deskripsi.length > 100 ? product.deskripsi.substring(0, 100) + "..." : product.deskripsi}
            </p>
          </figcaption>
        </div>
      ))}
    </section>
  );
};

export default CardProduct;
