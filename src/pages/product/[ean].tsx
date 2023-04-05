import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { IProduct } from "@/interfaces/IProduct";
import { ToastContainer } from "react-toastify";
import styles from "@/styles/Home.module.css";
import Head from "next/head";
import { FiShoppingCart, FiArrowLeft } from "react-icons/fi";
import { useState } from "react";
import { Cart } from "@/components/Cart";
import { useCart } from "@/context/CartContextProvider";

interface ProductPageProps {
  product: IProduct;
}

export default function ProductPage({ product }: ProductPageProps) {
  const router = useRouter();
  const [showCart, setShowCart] = useState(false);
  const { addItem } = useCart();

  if (router.isFallback) {
    return <div>Carregando...</div>;
  }

  const handleBackClick = () => {
    router.push("/");
  };

  return (
    <>
      <header className="bg-primary-blue fixed w-full z-50">
        <div className="flex gap-4 justify-center align-middle p-1">
          <button
            onClick={() => handleBackClick()}
            type="button"
            className="sm:hidden lg:block ml-3 h-20 w-20  flex items-center justify-center rounded-full"
          >
            <span className="sr-only">Voltar</span>
            <FiArrowLeft className="color-red w-10 h-10" />
          </button>
          <button
            onClick={() => setShowCart(true)}
            type="button"
            className="sm:hidden lg:block ml-3 h-20 w-20  flex items-center justify-center rounded-full"
          >
            <span className="sr-only">Carrinho</span>
            <FiShoppingCart className="color-red w-10 h-10" />
          </button>
        </div>
      </header>
      <main className={`${styles.main} sm:p-1`}>
        <div>
          <ToastContainer />
        </div>
        {showCart && (
          <Cart open={showCart} onClose={() => setShowCart(false)} />
        )}
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between mx-auto max-w-screen-lg mt-10">
          <img
            className="w-full md:w-1/2 max-w-lg rounded-lg shadow-lg"
            src={product.picture}
            alt={product.name}
          />
          <div className="flex flex-col items-center md:items-start w-full md:w-1/2 md:ml-10">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-lg mt-2">{product.fullname}</p>
            <p className="text-3xl font-bold mt-4 mb-2">R${product.price}</p>
            <button
              type="button"
              className="z-10 w-full bg-primary-blue border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-primary-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-blue mt-2"
              onClick={() => {
                addItem(product);
              }}
            >
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // buscar os ids dos produtos
  const products = fetchData();
  const paths = (await products).map((product) => ({
    params: { ean: product.ean.toString() },
  }));
  return { paths, fallback: true };
};

const fetchData = async () => {
  const response = await fetch("http://localhost:3000/api/products");
  const data = await response.json();
  return data.products as IProduct[];
};

export const getStaticProps: GetStaticProps<ProductPageProps> = async ({
  params,
}) => {
  // buscar o produto pelo id
  const products = fetchData();
  const productId = params?.ean as string;
  const product = (await products).find(
    (item) => String(item.ean) == productId
  );

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: { product },
  };
};
