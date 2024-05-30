const CardProduct = ({ products }) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-6 my-12">
      {products.map((product, index) => (
        <div key={index} className="bg-white rounded-xl ts relative overflow-hidden  ">
          <img src={product.img} className="object-cover w-full" alt={product.title} />
          <figcaption className="p-5 text-center">
            <h2 className="text-lg sm:text-xl font-semibold">{product.title}</h2>
            <p className="text-sm sm:text-md">{product.description.length > 100 ? product.description.substring(0, 100) + '...' : product.description}</p>
          </figcaption>
        </div>
      ))}
    </section>
  );
};

export default CardProduct;