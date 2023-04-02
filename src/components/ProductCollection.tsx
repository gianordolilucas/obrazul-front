import { IProduct } from "../interfaces/IProduct";
import Image from "next/image";
interface ProductCollectionProps {
  products: IProduct[];
}
export const ProductCollection: React.FC<ProductCollectionProps> = ({
  products,
}) => {
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
                    <h3 className="text-sm text-gray-700">
                      <a href={`../pages/product/${product.ean}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {product.price}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div>Nada</div>
          )}
        </div>
      </div>
    </div>
  );
};
