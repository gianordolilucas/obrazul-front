import { useCart } from "@/context/CartContextProvider";
import { IProduct } from "../interfaces/IProduct";
import Image from "next/image";

type ProductCollectionProps = {
  products: IProduct[];
  onAddToCart: (item: IProduct) => void;
};

export function ProductCollection({
  products,
  onAddToCart,
}: ProductCollectionProps) {
  return (
    <div className="bg-white font-sans">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <div key={product.ean} className="group relative">
                <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <Image
                    src={product.picture}
                    alt={product.fullname}
                    width="100"
                    height="100"
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">{product.name}</h3>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {product.price}
                  </p>
                </div>
                <button
                  type="button"
                  className="w-full bg-indigo-600 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => {
                    console.log("Adicionando o item: ", product);
                    onAddToCart(product);
                  }}
                >
                  Add item to cart
                </button>
              </div>
            ))
          ) : (
            <div>Nada</div>
          )}
        </div>
      </div>
    </div>
  );
}
