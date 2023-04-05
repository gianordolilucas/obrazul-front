import { useCart } from "@/context/CartContextProvider";
import { IProduct } from "../interfaces/IProduct";
import Image from "next/image";
import { useRouter } from "next/router";

type ProductCollectionProps = {
  products: IProduct[];
  onAddToCart: (item: IProduct) => void;
};

export function ProductCollection({
  products,
  onAddToCart,
}: ProductCollectionProps) {
  const router = useRouter();
  function handleProductClick(product: IProduct) {
    router.push(`/product/${product.ean}`);
  }
  return (
    <div className="bg-white font-sans static z-10">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-4  z-10">
        <h2 className="text-4xl self-center text-center font-bold tracking-tight text-primary-blue">
          Lista de Produtos
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 z-10 lg:grid-cols-4 xl:gap-x-8">
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <div key={product.ean} className="group relative p-1 z-10">
                <div className="max-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-transparent lg:aspect-none group-hover:opacity-75 lg:h-60 items-center">
                  <Image
                    src={product.picture}
                    alt={product.fullname}
                    width="100"
                    height="100"
                    className="h-full w-full object-cover object-center m-autoz-10 "
                  />
                </div>
                <div className="mt-4 flex justify-between z-10">
                  <div>
                    <button onClick={() => handleProductClick(product)}>
                      <h3 className="truncate text-sm text-gray-700 w-40 z-10 ">
                        {product.name}
                      </h3>
                    </button>
                  </div>
                  <p className="text-sm font-medium text-gray-900 z-10">
                    {product.price}
                  </p>
                </div>
                <button
                  type="button"
                  className="z-10 w-full bg-primary-blue border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-primary-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-blue mt-2"
                  onClick={() => {
                    onAddToCart(product);
                  }}
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            ))
          ) : (
            <div>Nenhum item encontrado por aqui </div>
          )}
        </div>
      </div>
    </div>
  );
}
