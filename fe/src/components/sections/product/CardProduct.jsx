const CardProduct = ({ products }) => {
  return (
    <section className="flex gap-4">
      {products.map((product, index) => (
        <div key={index} className="bg-white rounded-xl  ts relative overflow-hidden">
          <img src={product.img} className="object-cover  w-full" alt={product.title} />
          <figcaption className="p-5 text-center">
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p>{product.description.length > 100 ? product.description.substring(0, 100) + '...' : product.description}</p>
          </figcaption>
        </div>
      ))}
    </section>
  );
};

export default CardProduct;